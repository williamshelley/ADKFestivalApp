import requests
import json
import urllib
from bs4 import BeautifulSoup
from flask import Flask, jsonify
import re

page = requests.get('https://www.adkfilmfestival.org/festival/?cat=drama')
soup = BeautifulSoup(page.text, 'html.parser')
gallery = soup.find(id="portfolio-gallery")
gallery_links = gallery.find_all("a")
gallery_imgurls = gallery.find_all("img")
full_width = soup.find(id="full-width")
current_category = full_width.find_all("a", {"class":"current"})[0].get("data-cat")
if current_category == "-1":
	current_category = "All"
else:
	regex = re.compile('[^a-zA-Z]')
	current_category = regex.sub('', current_category)
current_category = current_category.capitalize()
		
print(current_category)

data = dict()
title_list = []
link_list = []
for image in gallery_links:
	title = image.get("title")
	link = image.get("href")
	if (title is not None):
		title_list.append(title)
	if (link is not None):
		link_list.append(link)

source_list = []
for image in gallery_imgurls:
	if (image is not None):
		source_list.append(image.get("src"))

web_scrape = Flask(__name__)

@web_scrape.route('/',methods=["GET"])
def ping():
	return jsonify({
		"category": current_category,
		"titles": title_list,
		"links": link_list,
		"sources": source_list,
	})

web_scrape.run()