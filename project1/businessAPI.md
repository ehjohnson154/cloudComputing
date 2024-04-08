Businesses

    Users who own businesses should be able to add their businesses to the application. When a business owner adds their business they will need to include the following information:
        Business name
        Business street address
        Business city
        Business state
        Business ZIP code
        Business phone number
        Business category and subcategories (e.g. category "Restaurant" and subcategory "Pizza")

    The following information may also optionally be included when a new business is added:
        Business website
        Business email

    Business owners may modify any of the information listed above for an already-existing business they own.

    Business owners may remove a business listing from the application.

    Users may get a list of businesses. The representations of businesses in the returned list should include all of the information described above. In a later assignment, we will implement functionality to allow the user to list only a subset of the businesses based on some filtering criteria, but for now, assume that users will only want to fetch a list of all businesses.

    Users may fetch detailed information about a business. Detailed business information will include all of the information described above as well as reviews of the business and photos of the business (which we discuss below).

Business API

    /Business
        Get /Business_List // Grabs a list of all businesses by ID

    /Business/{id}
        Get /Business/{id} // grabs ALL data around that business, including reviews and photos
        POST Business/{id} // Create new business, defaults to generatin ID if none given?
        DELETE /Business/{id} // Remove business


    /Business/{id}/information // provides basic information including name, address, phone number, website, email
        * GET /Business/{id}/information

    various API calls to access individual fields

    GET /Business/{id}/information/name 
    PUT /Business/{id}/information/name 

    GET /Business/{id}/information/street address
    PUT /Business/{id}/information/street address  
    
    ...
    ...

    GET /Business/{id}/information/website
    PUT /Business/{id}/information/website




    /Business/{id}/Review //Get a list of all reviews
        Get /Business/{id}/Review

    /Business/{id}/Review/{id} // Interact with one specific review
        Get /Business/{id}/Review/{id}  
        PUT /Business/{id}/Review/{id} 
        POST /Business/{id}/Review/{id} 
        DELETE /Business/{id}/Review/{id} 

    /Business/{id}/photos // Get a list of all photos
        GET /Business/{id}/photos

    /Business/{id}/photos/{id} // Get a specific photo by ID
        GET /Business/{id}/photos/{id} 
        DEL /Business/{id}/photos/{id} 
