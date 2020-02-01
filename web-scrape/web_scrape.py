import requests
import json
import urllib
from bs4 import BeautifulSoup
from flask import Flask, jsonify
import re

base_url = 'https://www.adkfilmfestival.org/festival/'
#request = requests.get(base_url)
#soup = BeautifulSoup(request.text, "html.parser")

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

#returns a list of all image sources
def find_sources(gallery):
	sources = []
	gallery_sources = gallery.find_all("img")
	for image in gallery_sources:
		if (image is not None):
			sources.append(image.get("src"))
	return sources

#takes data from a single page and feeds it into a 6 tuple of arrays
def parse_gallery_page(url):
	request = requests.get(url)
	soup = BeautifulSoup(request.text,"html.parser")
	gallery = soup.find(id="portfolio-gallery")
	full_width = soup.find(id="full-width")
	
	current_category = full_width.find_all("a",{"class":"current"})[0].get("data-cat")
	category = prepare_category(current_category)

	categories = []
	titles = []
	id_list = []
	links = []
	sources = find_sources(gallery)
	descriptions = []

	#gallery_links = gallery.find_all("a")
	for image in gallery_links:
		title = image.get("title")
		link = image.get("href")
		if title is not None:
			titles.append(title)
			id_list.append(str(hash(title)))
			categories.append(category)

		if link is not None:
			links.append(link)

		description = prepare_description(link)

		if description is not None:
			descriptions.append(description)
		

	return (categories, titles, id_list, links, sources, descriptions)

cat_request = requests.get(base_url)
cat_soup = BeautifulSoup(cat_request.text,"html.parser")
cat_width_a = cat_soup.find(id="full-width").find_all("a")
category_links = find_categories(cat_width_a)

categories = []
titles = []
id_list = []
links = []
sources = []
descriptions = []

category_links = [base_url]
for url in category_links:
	page = parse_gallery_page(url)
	categories += set_categories(page[0])
	titles += page[1]
	id_list += page[2]
	links += page[3]
	sources += page[4]
	descriptions += page[5]


web_scrape = Flask(__name__)

@web_scrape.route('/',methods=["GET"])
def ping():
	return jsonify({
		"categories": categories,
		"titles": titles,
		"id_list": id_list,
		"links": links,
		"sources": sources,
		"descriptions": descriptions,#should be eventually changed to desc_list
	})

web_scrape.run()
