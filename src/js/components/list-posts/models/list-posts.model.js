angular.module('frontpress.components.list-posts').factory('ListPostsModel', ListPostsModel);

function ListPostsModel(PostsApi, MediaApi, $q, SlugsMapModel){
    var model = {
        postsList: null,
        loadPosts: loadPosts,
        loadFeaturedImages: loadFeaturedImages,
        pageSize: null,
        pageNumber: 1,
        isLoadingPosts: null,
        totalPostsNumber: null,
        setTotalPostsNumber: setTotalPostsNumber,
    }

    return model;

    function setTotalPostsNumber(totalPostsNumber){
        model.totalPostsNumber = totalPostsNumber;
    } 

    function loadFeaturedImages(loadedPosts){
        var postPromises = {
            appendFeaturedImagesToPostsPromise: appendFeaturedImagesToPostsPromise,
        };

        function appendFeaturedImagesToPostsPromise(featuredMediaId){
            var defer = $q.defer();

            var featuredImagesPromise = MediaApi.getMediaById(featuredMediaId);
            
            featuredImagesPromise.success(function(result){
                defer.resolve(result);
            });

            
            return defer.promise;
        }

        for(var i=0; i < loadedPosts.length; i++){
            postPromises.appendFeaturedImagesToPostsPromise(loadedPosts[i].featured_media).then(function(featuredImagesResult){

                for(var j=0; j < model.postsList.length;j++){
                    if(model.postsList[j].featured_media === featuredImagesResult.id){
                        model.postsList[j].featured_image = featuredImagesResult.source_url;
                    }                
                }
            });                        
        }
    }   



    function loadPosts(params, shouldGetFeaturedMediaFromAnotherEndpoint){
        model.isLoadingPosts = true;        
        var defer = $q.defer();

        var configs = {
            fields: 'ID,title,date,featured_image,excerpt'
        };           

        var postPromises = {
            getAllPostsPromise: getAllPostsPromise,
        };

        function getAllPostsPromise(){
            var defer = $q.defer();

            var allPostsPromise = PostsApi.getAllPosts(params, configs);

            allPostsPromise.success(function(result){                                                        
                defer.resolve(result);
            });            
            return defer.promise;
        }

        postPromises.getAllPostsPromise().then(function(postsResults){
            model.totalPostsNumber = postsResults.found;
            
            SlugsMapModel.updateFromPosts(postsResults);

            if(model.postsList){
                model.postsList = model.postsList.concat(postsResults);
            } else {
                model.postsList = postsResults;
            }            

            defer.resolve(model.postsList);

            model.isLoadingPosts = false;            
        });

        return defer.promise;
        
    }
}
