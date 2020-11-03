{
    // Method to submit form data for new post using Ajax

    let createPost=function(){
        let newPostForm=$('#new-post-form');

        newPostForm.submit(function(event){
            event.preventDefault(); 
            
            $.ajax({

                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(), // use to convert newPostForm data into json.
                success:function(data) {
                    let newPost=newPostDom(data.data.post);
                    $('#posts-list-container >ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                    
                },error:function(error) {
                    console.log(error.responseText);
                    
                }

            });
        });
    }

    // Method to create post in Dom


    let newPostDom=function(post){
        return $(`<li id="post-${post._id}">
        <p>
            
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post.id}">Delete</a>
            </small>
    
    
      
                        ${post.content}
            <br>
            <small>
                ${post.user.name}
            </small>
        </p>
        <div class="post-comments">
            
            <form action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Add Comment">
            </form>
    
           
    
            <div class="post-comments-list">
                <ul id="post-comments-${post._id}">
                    
    
                </ul>
            </div>
        </div>
    
    </li>`)
    }

    // Method to delete Post from Dom

    let deletePost=function(deleteLink){
        $(deleteLink).click(function(event){
            event.preventDefault();

            $.ajax({

                type:'get',
                url:$(deleteLink).prop('href'), // to get the url of delete link i.e. href value
                success:function(data){
                    $('#post-${data.data.post._id}').remove;
                },error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    createPost();
}