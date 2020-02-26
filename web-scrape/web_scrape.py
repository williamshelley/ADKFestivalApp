import requests
import json
import urllib
from bs4 import BeautifulSoup
from flask import Flask, jsonify
import re
import threading
import queue
import time

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
			event.description = prepare_description(event.desc_link)
	
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

data_list = []

for event in events:
	hashed_id = str(hash(event.id))
	category_set.add(event.category)

	data_list.append(json.dumps(json.dumps({hashed_id: {
		"title": event.title,
		"category": event.category,
		"description": event.description,
		"source": event.source,
	}})))
category_set = list(category_set)

data = json.dumps(data_list)


elapsed_time = time.time() - start_time
print("ELAPSED TIME: ", time.strftime("%H:%M:%S", time.gmtime(elapsed_time)))

web_scrape = Flask(__name__)

json_dictionary = { "data": data, "category_set": category_set }
json_object = json.dumps(json_dictionary) 
with open("sample.json", "w") as outfile: 
    outfile.write(json_object) 

@web_scrape.route('/',methods=["GET"])
def ping():
	return jsonify({
		"data": data,
		"category_set": category_set,
	})

web_scrape.run()
