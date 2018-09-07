/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* 
         * Test that URLs are defined and the URL is not empty.
         * Wrapping this in a describe block for better readability.
         * Splitting the required tests into two parts so it is easier to
         * tell where the error is. 
         * First, check that the URL for each is defined.
         * Next, see that there is actual content in the URL
         */

         describe('Element URLs', function(){
             allFeeds.forEach((feed, index)=>{
              it(` Index ${index} (${feed.name}) is defined`, function(){
                expect(feed.url).toBeDefined();
             });
           });

           allFeeds.forEach((feed, index)=>{
              it(` Index ${index} (${feed.name}) has a URL: ${feed.url}`, function(){
                expect(feed.url).not.toBe('');
             });
           });
         });
        

         

        /* Tests each feedin the allFeeds object and ensures
         * it has a name defined and that the name is not empty.
         * 
         * NOTE: This could easily be combined with the test above
         * in an "elements" function or something similar. 
         * However, I am following the instructions. 
         */
         

         describe(`Element Names`,function(){

          allFeeds.forEach((feed, index) =>{
            it(`Element ${index} is defined`,function(){
              expect(feed.name).toBeDefined();
            });
          });

          allFeeds.forEach((feed, index) =>{
            it(`Element ${index} has a name of ${feed.name}`,function(){
              expect(feed.name).not.toBe('');
            });
          });

      });

    });


    /* TODO: Write a new test suite named "The menu" */
    describe(`The menu`, function(){

      /* TODO: Write a test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */       
      describe(`default behavior`, function(){
        var body = document.querySelector("body");
        it(`is to hide by default`,function(){
          expect(body.classList.contains("menu-hidden")).toBe(true);
        });
       });

       /* Ensures the menu changes visibility when the menu 
        * icon is clicked. This test has two expectations:
        * the menu displays when clicked 
        * the menu hides when clicked again.
        */  
      describe(`click behavior`, function(){
        var body = document.querySelector("body");
        var menuButton = document.querySelector(".icon-list");

        it(`is to open when clicked while closed`, function(){
          menuButton.click();
          expect(body.classList.contains("menu-hidden")).toBe(false);
          menuButton.click();
        });

        it(`is to close when clicked while open`, function(){
          menuButton.click();
          menuButton.click();
          expect(body.classList.contains("menu-hidden")).toBe(true);
        });
      });  

    });
        
    /*Tests to see if there is at least one element loaded upon boot*/
    describe("Initial Entries", function(){
      /* Ensures when the loadFeed function is called 
       * and completes its work, there is at least
       * a single .entry element within the .feed container.
       */
       beforeEach(function(done){
        loadFeed(0,done);
       });

       it(`has at least one .entry element within the .feed container`, function(){
        var feed = document.querySelector(".feed");
        var feedChild = false;

        for(var i=0; i < feed.children.length; i++){
          if(feed.children.item(i).children[0].className.indexOf("entry") > -1){ 
            feedChild = true;
          };
        };

        expect(feedChild).toBe(true);
       });

    });

    /* Checks new feed functionality */
    describe(`New feed selection`, function(){
        /* Ensures when a new feed is loaded by the loadFeed function,
         * that the content actually changes.
         */
         const feed = document.querySelector(".feed");
         var initialContent;


      beforeEach(function(done){
        loadFeed(0, function () {
          initialContent = feed.innerText;
          loadFeed(1, done);
        });
      });

      it(`loads a new feed`, function(){
        const newFeed = feed.innerText;
        expect(newFeed === initialContent).toBe(false);
      });

    });

}());
