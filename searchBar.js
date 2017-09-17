
var mySearches = {
	recentSearches: [],
	currentSearch :"",
	lastResult : null,
	saveImagesAndLinksAndTitles: function(results){
		var count =0;
		for (var i=0; i<results.data.children.length && count<9;i++ ) {
			var url=results.data.children[i].data.thumbnail
            if (url !== null &&  url!=="self" && url!=="default") {
                this.foundPosts.foundImages[count] = results.data.children[i].data.thumbnail;
            	this.foundPosts.links[count] = "https://www.reddit.com" + results.data.children[i].data.permalink;
            	this.foundPosts.titles[count] = results.data.children[i].data.title;
            	count++;
        	}
		}
	},
	foundPosts : {
		foundImages: [],
		links: [],
		titles: []
	},
	resetLastSearch: function(){
		this.lastResult = null;
		this.foundPosts.foundImages = [];
		this.foundPosts.links = [];
        this.foundPosts.titles = [];
		
	},
};

var	findOnReddit = function(event){
	if (event.key == "Enter"){
		mySearches.resetLastSearch();
		mySearches.currentSearch = document.getElementById("searchBars").value;
		document.getElementById("searchBars").value = "";
		reddit.search(mySearches.currentSearch+'\b',mySearches.currentSearch).fetch(function(res){
				mySearches.lastResult = res.data.after;
				mySearches.recentSearches.push(this.currentSearch);
				let foundResults = res;
				console.log(res);
				mySearches.saveImagesAndLinksAndTitles(foundResults);
				showPictures(foundResults);
		});
	}
};


function showPictures(res){
	document.getElementById("photoTable").style.visibility = "visible";
	for (var i=0;i<9;i++){
		document.getElementById("pic"+i).src=mySearches.foundPosts.foundImages[i];
		document.getElementById("link"+i).href=mySearches.foundPosts.links[i];
		document.getElementById("pic"+i).title=mySearches.foundPosts.titles[i];
	}
}