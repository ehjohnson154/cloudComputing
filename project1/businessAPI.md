Business API overiew:

Users should be able to get, add, delete, and interact with:

* Business information
* Reviews
* Photos


Business API

    /Business
        Get /Business_List // Grabs a list of all businesses by ID

    /Business/{id}
        Get /Business/{id} // grabs ALL data around that business, including reviews and photos
        POST Business/{id} // Create new business, defaults to generatin ID if none given?
        DELETE /Business/{id} // Remove business


        /Business/{id}/information // provides basic information including name, address, phone number, website, email
            GET /Business/{id}/information

        various API calls to access individual fields
            //api calls don't need to delete, as its assumed all information is required save the optional fields

            GET /Business/{id}/information/name 
            PUT /Business/{id}/information/name 

            GET /Business/{id}/information/street address
            PUT /Business/{id}/information/street address  
            
            ...
            ...
            GET /Business/{id}/information/website
            PUT /Business/{id}/information/website
            DELETE /Business/{id}/information/website

            GET /Business/{id}/information/email
            PUT /Business/{id}/information/email
            DELETE /Business/{id}/information/email




    /Business/{id}/Review //Get a list of all reviews
        Get /Business/{id}/Review

    Get /Business/{id}/Review/{user_id}/ //lists all reviews from user

        /Business/{id}/Review/{user_id}/{id} // Interact with one specific review
            Get /Business/{id}/Review/{user_id}/{id} 
            PUT /Business/{id}/Review/{user_id}/{id} 
            POST /Business/{id}/Review/{user_id}/{id}
            DELETE /Business/{id}/Review/{user_id}/{id}

            various API calls to access individual fields
                Get /Business/{id}/Review/{user_id}/{id}/stars
                PUT /Business/{id}/Review/{user_id}/{id}/stars     

                Get /Business/{id}/Review/{user_id}/{id}/dollars
                PUT /Business/{id}/Review/{user_id}/{id}/dollars

                Get /Business/{id}/Review/{user_id}/{id}/review
                PUT /Business/{id}/Review/{user_id}/{id}/review
                DELETE /Business/{id}/Review/{user_id}/{id}/review                    

    /Business/{id}/photo // Get a list of all photos
        GET /Business/{id}/photo

        /Business/{id}/photo/{id} // Get a specific photo by ID
            GET /Business/{id}/photo/{id} 
            DEL /Business/{id}/photo/{id} 
