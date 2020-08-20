## Scheduling Application for Adirondack Film Festival Events

### Running Instructions Dev Environment:

	iOS:
		react-native run-ios

	Android: (Java 8)
		react-native run-android


### Organization:
	Views Directory:
		Holds the main views for each page of the application that are accessed through the main drawer navigator (in App.js)
		- Details: the page that is opened when an event item is clicked
		- Home: the main page with a FlatList showing event cards based on the filter
		- Schedule: the Schedule page that can allow for switching between a grid-based and list-based view (this can be allowed by member boolean variable "listView," when set to true and the headerRight icon is not commented out, the view shown is the ScheduleListView. When it is false, the view shown is the ScheduleColumnView
		- ScheduleColumnView: a page used by Schedule that shows events in the Async Storage location with key SCHEDULE_KEY (this is located in "utils/data-funcs". Items are displayed in a grid/column format
		- ScheduleListView: a page used by Schedule that shows events in the Async Storage location with key "SCHEDULE_KEY"
		- Sponsors: a page that displays the list of sponsors, the information is accessed through Async Storage location SPONSOR_STORAGE (in utils/data-funcs)
		- Venues: list of venues that displays information contained in Async Storage location: LOCATION_STORAGE
	Utils Directory:
		data-funcs:
		- keys for storage locations ins Async storage
		- methods for accessing items in Async Storage
		architecture:
		- can mostly ignore, however, the _venue_name_img_separator_ is used to parse the venue name from the image url.
Ex: the data containing the list of venues is in this format: venueName:::::venueURL. The ":::::" is equivalent to the _venue_name_img_separator_
		helper-funcs:
		- contains functions to parse and format date information
		- formatDate function puts a date string into the format ready for Date object construction. ex: new Date(formatDate(str))
		- formatDateForDetails formats the date for the Details view
		notification-services:
		- configuration for local notifications

	Components Directory:
		- AddButton: general button component, mainly used for adding or removing items from the schedule
		- DescriptionBox: component that holds the event description on Details page (in the "About" tab)
		- DetailsBox: component that has buttons for adding/removing events and finding the locations
		- DrawerContent: custom drawer navigator component (put into drawerContent prop of Drawer Navigator-->App.js)
		- DropdownFilter: the filter for categories on Home/Films page.
		- EventCard: button with an image and overlay text. Navigates to Details page for the selected event. (Used in Home.js and in ScheduleCard,ScheduleListItem"
		- IconButton: icon styled button for stack navigation header
		- ScheduleCard: modification of EventCard for placement in ScheduleColumnView
		- ScheduleListItem: modification of EventCard for placement in ScheduleListView
		- ScheduleHeader: used to display the location images and location names at the top of the FlatList (as list header component, only used in ScheduleColumnView)
		- SpringEffect: animation effect component

	Images Directory:
		- holds icon images and drawer background image

	Web-Scrape Directory:
		- holds the web scraping script and the json file for offline Async Storagge access

	App.js:
		- constructs the stack navigators and adds them to Drawer Navigator

	ADK Festival App Website Format Requirements.txt:
		- format of a date string that can be used by formatDate (to get the end date, split by " to " then call formatDate)

	styles.js:
		- holds a lot of generic style information, however, it is messy and might be easier to either use a different styles page or to make styles inside unique components
		