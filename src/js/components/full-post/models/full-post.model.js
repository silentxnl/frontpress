angular.module('frontpress.components.full-post').factory('FullPostModel', FullPostModel);

function FullPostModel(PostsApi, TagsApi, CategoriesApi, $q){
	var model = {
		addCategory: addCategory,
		categories: [],
		categoriesIds: null,
		content: null,
		date: null,
		featuredImage: null,
		isLoadingFullPost: false,
		loadFullPostById: loadFullPostById,
		setContent: setContent,
		setDate: setDate,
		setFeaturedImage: setFeaturedImage,
		setCategoriesIds: setCategoriesIds,
		setTitle: setTitle,
		tagNames: null,
		title: null,
		slug: null,
		setSlug: setSlug,
		id: null,
		setId: setId
	};

	function addCategory(category){
		model.categories.push(category);
	}

	function setTitle(title){
		model.title = title;
	}

	function setContent(content){
		model.content = content;
	}

	function setDate(date){
		model.date = date;
	}

	function setFeaturedImage(featuredImage){
		model.featuredImage = featuredImage;
	}

	function setCategoryNames(categoryNames){
		model.categoryNames = categoryNames;
	}

	function setSlug(slug){
		model.slug = slug;
	}

	function setId(id){
		model.id = id;
	}

	function setCategoriesIds(categoriesIds){
		model.categoriesIds = categoriesIds;
	}

	function loadFullPostById(id){
		var defer = $q.defer();

		model.isLoadingFullPost = true;
		var configs = {
			fields: 'ID,title,featured_image,data,categories,content,slug'
		};

		var postPromise = PostsApi.getPostById(id, configs);
		postPromise.success(function(result){			
			model.setTitle(result.title);
			model.setContent(result.content);
			model.setFeaturedImage(result.featured_image);
			model.setDate(result.date);		
			model.setSlug(result.slug);
			model.setCategoriesIds(result.categories);
			model.isLoadingFullPost = false;
			defer.resolve(model);
		});

		return defer.promise;
	}


	return model;
}
