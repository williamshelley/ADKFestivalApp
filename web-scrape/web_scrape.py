import requests
import json
import urllib
from bs4 import BeautifulSoup
from flask import Flask, jsonify
import re
import threading
import queue
import time
import random


'''
POTENTIALLY ONLY SCRAPE THE "ALL" CATEGORY AND ITS PAGES 
(EACH EVENTS CATEGORIES IS LISTED ON DESCRIPTION PAGE)
'''

events = set()
category_set = set()
location_set = set()

pages = []
id_set = set()
data_list = []
set_test = set()
lock = threading.Lock()
start_time = time.time()

base_url = 'https://www.adkfilmfestival.org/'

cat_request = requests.get(base_url + "festival/")
cat_soup = BeautifulSoup(cat_request.text,"html.parser")
cat_width_a = cat_soup.find(id="full-width").find_all("a")

sponsor_request = requests.get(base_url + "sponsors/")
sponsor_soup = BeautifulSoup(sponsor_request.text, "html.parser")
sponsor_width = sponsor_soup.find(id="full-width").find_all("a")
sponsor_list = []
for item in sponsor_width:
	sponsor = [item.text, item.get("href")]
	if ("https" in sponsor[1] or "http" in sponsor[1]):
		sponsor_list.append(sponsor)

FIRST_TIME = "3/1/2020 7:00 AM"
SECOND_TIME = "3/7/2020 7:00 PM"

venues_request = requests.get(base_url + "about/venues/")
venues_soup = BeautifulSoup(venues_request.text,"html.parser")
venues_width = venues_soup.find(id="full-width").find_all("div")[0].find_all("div",{"class":"services-box col"})
name_image_separator = ":::::"
venues = []
style_prefix = "background-image:url("
for item in venues_width:
	name = item.find("div",{"class":"sc-wraper"}).getText()
	image_url = item.find("div",{"class":"services-img"})["style"][len(style_prefix):-1]
	venues.append([name, image_url])

#need to modify and make this the primary way of passing information
class Event:
	def __init__(self):
		self.category = None
		self.id = None
		self.title = None
		self.source = None
		self.desc_link = None
		self.description =  None

	def is_valid_event(self):
		if (self.category is not None and
			self.id is not None and
			self.title is not None and
			self.source is not None and
			self.desc_link is not None and
			self.description is not None):
			return True
		return False

	def __str__(self):
		return (
			"\ncategory: " + str(self.category)+
			"\nid: " + str(self.id)+
			"\ntitle: " + str(self.title)+
			"\nsource: " + str(self.source)+
			"\ndesc_link: " + str(self.desc_link)+
			"\ndescription: " + str(self.description)
		)

def get_pg_items(gallery):
	return gallery.find_all("div",{"class":"pg-item"})

def get_page_links(gallery):
	page_links = []
	a_list = gallery.find_all("a")
	for a in a_list:
		href = a.get("href")
		data_page = a.get("data-page")
		if data_page is not None and href is not None:
			page_links.append(href)

	return page_links

#sets -category, -title, -id, -source, -description, -desc_link
def set_event(pg_item, category):
	event = Event()

	if category is not None:
		event.category = category
	
	event.id = pg_item.get("data-itemid")
	if event.id is not None:
		event.title = pg_item.find("a").get("title")
		event.desc_link = pg_item.find("a").get("href")
		event.source = pg_item.find("img").get("src")
		if event.desc_link is not None:
			desc_cats = get_description_and_categories(event.desc_link)
			event.description = desc_cats[0]
			event.category = desc_cats[1]
			event.video_link = desc_cats[2]




			#DATE AND LOCATION
			#event.location = VENUES_PLACEHOLDER[int(event.id)%len(VENUES_PLACEHOLDER)]
			location = venues[int(event.id)%len(venues)]
			event.location = location[0]
			location2 = venues[int(event.id + "10000")%len(venues)]

			location_set.add(event.location + name_image_separator + location[1])
			start = random_date(FIRST_TIME, SECOND_TIME, random.random())
			same_day = start[:11] + SECOND_TIME[9:]
			end = random_date(start, same_day, random.random())
			event.date = start + " to " + end
			date1 = start + " to " + end

			start = random_date(FIRST_TIME, SECOND_TIME, random.random())
			same_day = start[:11] + SECOND_TIME[9:]
			end = random_date(start, same_day, random.random())
			#event.date += "," + start + " to " + end
			date2 = start + " to " + end

			time_and_locations = [{
				"time":date1,
				"location":location[0],
			},{
				"time":date2,
				"location":location2[0],
			}]
			event.time_and_locations = json.dumps(time_and_locations)



			#DATE AND LOCATION

	if event.is_valid_event():
		return event

	return None
	
start_time = time.time()

base_url = 'https://www.adkfilmfestival.org/festival/'

# strip category of non-alphabetic chars and capitalize (title-0 => Title)
# if -1, change it to All
def prepare_category(category):
	result = category
	if result == "-1":
		result = "All"
	
	last_char = str(result[len(result)-1])
	while last_char.isdigit() or last_char == '-':
		result = result[:-1]
		last_char = str(result[len(result)-1])

	result = result.capitalize()
	return result

def set_categories(cat_list):
	result_list = []
	for category in cat_list:
		result_list.append(prepare_category(category))
	return result_list

def find_categories(full_width_a):
	result_list = []
	for item in full_width_a:
		if item.get("data-cat") is not None:
			result_list.append(item.get("href"))
	return result_list

#concatenates description from html (originally broken up if it was too long)
def prepare_description(description_url):
	request = requests.get(description_url)
	soup = BeautifulSoup(request.text,'html.parser')
	desc_html = soup.find_all("p")
	result = ""
	for desc in desc_html:
		part = desc.getText()
		if part is not None:
			result += " " + part

	return result

def scrape_page(page_url, events):
	request = requests.get(page_url)
	soup = BeautifulSoup(request.text,"html.parser")
	gallery = soup.find(id="portfolio-gallery")
	full_width = soup.find(id="full-width")
	pg_items = get_pg_items(gallery)
	raw_category = full_width.find_all("a",{"class":"current"})[0].get("data-cat")
	parsed_category = prepare_category(raw_category)
	for item in pg_items:
		event = set_event(item, parsed_category)
		if event is not None:
			events.append(event)
	return

def scrape_category(category_url, events):
	request = requests.get(category_url)
	soup = BeautifulSoup(request.text,"html.parser")
	gallery = soup.find(id="portfolio-gallery")
	page_links = get_page_links(gallery)
	page_threads = []

	if len(page_links) == 0:
		page_links = [category_url]

	for url in page_links:
		#print(url)
		thread = threading.Thread(target=scrape_page, args=(url,events))
		thread.start()
		page_threads.append(thread)

	for thread in page_threads:
		thread.join()

	return

cat_request = requests.get(base_url)
cat_soup = BeautifulSoup(cat_request.text,"html.parser")
cat_width_a = cat_soup.find(id="full-width").find_all("a")
category_links = find_categories(cat_width_a)

categories = []
titles = []
id_list = []
desc_links = []
sources = []
descriptions = []
pages = []
events = []

threads = []
for url in category_links:
	thread = threading.Thread(target=scrape_category, args=(url,events))
	thread.start()
	threads.append(thread)

for thread in threads:
	thread.join()

num_pages = 0
category_set = set()

for event in events:
	categories.append(event.category)
	titles.append(event.title)
	id_list.append(str(hash(event.id)))
	sources.append(event.source)
	desc_links.append(event.desc_link)
	descriptions.append(event.description)

for category in categories:
	category_set.add(category)

category_arr_from_set = []
for category in category_set:
	category_arr_from_set.append(category)


elapsed_time = time.time() - start_time
print("ELAPSED TIME: ", time.strftime("%H:%M:%S", time.gmtime(elapsed_time)))

web_scrape = Flask(__name__)

@web_scrape.route('/',methods=["GET"])
def ping():
	return jsonify({
		"category_set": category_arr_from_set,
		"categories": categories,
		"titles": titles,
		"id_list": id_list,
		"links": desc_links,
		"sources": sources,
		"descriptions": descriptions,
	})

web_scrape.run()
