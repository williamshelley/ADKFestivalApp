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
	venues.append(name + name_image_separator + image_url)


class Event:
	def __init__(self):
		self.category = set()
		self.id = None
		self.title = None
		self.source = None
		self.desc_link = None
		self.video_link = None
		self.description =  None
		self.time_and_locations = None

	def is_valid_event(self):
		if (self.category is not None and
			self.id is not None and
			self.title is not None and
			self.source is not None and
			self.desc_link is not None and
			self.description is not None and
			self.time_and_locations is not None
			#self.date is not None
			):
			return True
		return False

	def __str__(self):
		return (
			"\ncategory: " + str(self.category)+
			"\nid: " + str(self.id)+
			"\ntitle: " + str(self.title)+
			"\nsource: " + str(self.source)+
			"\ndesc_link: " + str(self.desc_link)+
			"\ndescription: " + str(self.description)+
			"\nlocation: " + str(self.location)+
			"\ndate: " + str(self.date)
		)

def str_time_prop(start, end, format, prop):
    stime = time.mktime(time.strptime(start, format))
    etime = time.mktime(time.strptime(end, format))
    ptime = stime + prop * (etime - stime)
    return time.strftime(format, time.localtime(ptime))


def random_date(start, end, prop):
    return str_time_prop(start, end, '%m/%d/%Y %I:%M %p', prop)

def get_pg_items(gallery):
	return gallery.find_all("div",{"class":"pg-item"})

def get_page_links(gallery):
	page_links = set()
	a_list = gallery.find_all("a")
	currentPage = -1
	for a in a_list:
		href = a.get("href")
		data_page = a.get("data-page")
		if data_page is not None and href is not None:
			page_links.add(href)
	return page_links

#sets -category, -title, -id, -source, -description, -desc_link
def set_event(pg_item, category):
	global category_set, location_set

	event = Event()

	if category is not None:
		event.category.add(category)
		category_set.add(category)
	
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


			screen_times_and_blocks = event.description.split("Screening Time:")[1]
			screen_times = screen_times_and_blocks.split("Screening In:")
			times = screen_times[0]
			block = None
			#need to have the input be split by something ie time at location, ...
			if (len(screen_times) > 1):
				block = screen_times[1]
			
			times = times.split("\n")
			times_dict = []

			for time in times:
				if len(time) < 1:
					times.remove(time)
			for time in times:
				global venues
				split_time = time.split(" at ")
				print(event.title)
				if len(split_time) > 1:
					times_dict.append({
						"time":prepare_time(split_time[0]),
						"location":split_time[1],
						"block":block,
					})
			event.time_and_locations = json.dumps(times_dict)

			#DATE AND LOCATION

	if event.is_valid_event():
		return event

	return None

def prepare_time(time):
	result = ""
	split_time_by_space = time.split(" ")
	date = split_time_by_space[0]


	time_1 = split_time_by_space[2]
	if len(time_1) < 5:
		time_1 = "0"+time_1
	first_time = time_1 + " " + split_time_by_space[3].upper()


	time_2 = split_time_by_space[5]
	if len(time_1) < 5:
		time_2 = "0"+time_2
	second_time = first_time
	if len(split_time_by_space) >= 7:
		second_time = time_2 + " " + split_time_by_space[6].upper()
	else:
		print(time)

	first = date + " " + first_time
	second = date + " " + second_time
	result = first + " to " + second
	return result

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
		cat = item.get("data-cat")
		if cat is not None:
			result_list.append(item.get("href"))
	return result_list

#concatenates description from html (originally broken up if it was too long)
def get_description_and_categories(description_url):
	request = requests.get(description_url)
	soup = BeautifulSoup(request.text,'html.parser')
	full_width = soup.find(id="full-width")
	cats = full_width.find_all("span",{"class":"ps-categories"})[0].getText().split(" / ")
	cats.append("All")
	desc_html = soup.find_all("p")
	result = ""
	video_link = ""
	iframe = full_width.find_all("iframe")
	if (iframe is not None and len(iframe)>0):
		video_link = iframe[0].get("src")

	record_times = False
	times = []
	for desc in desc_html:
		part = desc.getText()
		if record_times:
			times = desc.getText()
		
		if part is not None:
			result += "\n" + part

	return (result, cats, video_link)

def scrape_page(page_url, events):
	global lock, id_set, category_set

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
			lock.acquire()
			events.add(event)
			for cat in event.category:
				category_set.add(cat)
			id_set.add(event.id)
			lock.release()

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
		thread = threading.Thread(target=scrape_page, args=(url,events))
		thread.start()
		page_threads.append(thread)

	for thread in page_threads:
		thread.join()

	return


category_links = ['https://www.adkfilmfestival.org/festival/']
threads = []
for url in category_links:
	thread = threading.Thread(target=scrape_category, args=(url,events))
	thread.start()
	threads.append(thread)

for thread in threads:
	thread.join()

print(len(events))
for event in events:
	hashed_id = str(event.id)
	data_list.append({hashed_id: {
		"title": event.title,
		"category": list(event.category),
		"description": event.description,
		"video_link": event.video_link,
		"image": event.source,
		"time_and_locations": event.time_and_locations,
	}})
	
category_list = list(category_set)
location_list = list(location_set)
data = json.dumps(data_list)
json_object = json.dumps({ 
	"data": data, 
	"category_set": category_list,
	"location_set": venues,
	"sponsor_list": sponsor_list,
	})
with open("offline.json", "w") as outfile: 
    outfile.write(json_object)

elapsed_time = time.time() - start_time
print("ELAPSED TIME: ", time.strftime("%H:%M:%S", time.gmtime(elapsed_time)))


web_scrape = Flask(__name__)

@web_scrape.route('/',methods=["GET"])
def ping():
	return json_object

web_scrape.run()
