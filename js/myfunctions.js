    (function (){
        'use strict';

    const titleMissing = "Must to add title to add item."
    const descMissing = "Must to add description to add item."
    const duplicateTitle = "There is a title with the same title choose different title."
    const titleAndDescMissing = "Must add title and description to add item"

    //a list of items
    let itemList = {};
    /*
   class of item in the to do list.
   members:
       title: the item title.
       description: the item description.
       priority: true if the item is high priority.
    */
    class Item
    {
        constructor(title, description,priority)
        {
            this.title = title;
            this.description = description;
            this.priority = priority;
            this.delete = false;
        }

        setDelete()
        {
            Item.delete = true;
        }
    }

    /*
    class to do list.
    members:
        list: the list of the items.
     */
    class ItemList {
        constructor() {
            this.list = [];
        }

        //add item into list
        addItem(title, description,priority) {
            this.list.push(new Item(title, description,priority));
        }

        //check if the new item have same title of other item.
        checkDuplicateTitle(newTitle)
        {
            for (let item of this.list) {
                if(item.title === newTitle) {
                    return true;
                }
            }
            return false;
        }

        //sort the items in the list.
        sortFunc()
        {
            this.list.sort((a, b) => {
                let fa = a.title.toLowerCase(),
                    fb = b.title.toLowerCase();

                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            });
        }

        //remove item from the list.
        removeItem(title)
        {
            // remove object
            const removeIndex = this.list.findIndex(check => check.title === title);
            this.list.splice(removeIndex, 1);
        }

        //check if button delete clicked and remove from html.
        clickDeleted()
        {
            for (let button of document.getElementsByName("button-x")) {
                document.getElementById(button.id).addEventListener('click', () => {

                    let elementToRemove = document.getElementById(button.id);
                    elementToRemove.parentElement.remove();
                    this.removeItem(button.id);
                });
            }
        }

        //build the html of to do list.
        buildHTML = function(onOffPri){
            let result= "<div id = \"list-items\" class=\"list-group \" >";
            for (let item of this.list) {
                if (onOffPri && item.priority === false)
                {
                    continue;
                }
                else {
                    if (item.priority === true) {
                        result += "<a class=\"list-group-item\" style = \"margin-top: 3px; border:1px ;background-color:lavenderblush\">";
                    } else {
                        result += "<a class=\"list-group-item \" style = \"margin-top: 3px; border:1px\">";
                    }
                    result += "<h4 class=\"list-group-item-heading d-flex justify-content-between align-items-center\">" + item.title + "</h4>"
                        + "<button id=" + item.title + " type=\"button\" name = \"button-x\" class=\"btn btn-outline-danger\" style=\"float: right\">X</button>"
                        + "<p classtitle=\"list-group-item-text\">" + item.description + "</p>"
                        + "</a>"
                }
            }
            result += "</div>"
            result += "<br>";
            return result;
        }
    }

    //add error message in the html page.
    function errorMsg(errorMsg) {
        document.getElementById("error-msg").innerHTML = errorMsg;
        document.getElementById("error-msg").style.display = "block";
    }


    //upon loading we create the page, listener to event in the page.
    window.addEventListener('DOMContentLoaded', (event) => {
        itemList = new ItemList();

        //if the submit button clicked.
        document.getElementById("submit-button").addEventListener('click', () => {
            let itemTitle = document.getElementById("title").value.trim();
            let itemDesc = document.getElementById("description").value.trim();
            let priority = document.getElementById("high-priority").checked;

            if((itemTitle === "")&&(itemDesc === "")) {
                errorMsg(titleAndDescMissing);
            }
            else if(itemTitle === ""){
                errorMsg(titleMissing);
            }
            else if(itemDesc === "") {
                errorMsg(descMissing);
            }
            else if(itemList.checkDuplicateTitle(itemTitle)){
                errorMsg(duplicateTitle);
            }
            else{
                itemList.addItem(itemTitle,itemDesc,priority);
                document.getElementById("error-msg").style.display = "none";
                document.getElementById("todolist").innerHTML = itemList.buildHTML(false);
                document.querySelector("form").reset();
            }
        });

        //if the sort button button clicked.
        document.getElementById("sort-button").addEventListener('click', () => {
            itemList.sortFunc();
            document.getElementById("todolist").innerHTML = itemList.buildHTML(false);
        });

        //if the show high priority clicked.
        document.getElementById("show-high").addEventListener('click', () => {
                document.getElementById("form").style.display = "none";
                document.getElementById("back").style.display = "inline";
                document.getElementById("todolist").innerHTML = itemList.buildHTML(true);
        });

        //if the back button clicked.
        document.getElementById("back").addEventListener('click', () => {
                document.getElementById("form").style.display = "block";
                document.getElementById("back").style.display = "none";
                document.getElementById("todolist").innerHTML = itemList.buildHTML(false);
        });

        //when clicked on delete button.
        document.addEventListener('click', () => {
            itemList.clickDeleted();
            });
    });
})();