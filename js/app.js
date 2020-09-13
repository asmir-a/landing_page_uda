/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/




/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active
{/* <script src = "https://cdn.jsdelivr.net/npm/lodash@4.17.20/throttle.js"></script> */}



let navbar_list = document.querySelector("#navbar__list");
let sections_list = document.querySelectorAll("section");

let li_element_to_top = document.createElement("LI");
li_element_to_top.innerHTML = "to TOP";
li_element_to_top.className = "menu__link navbar_to_top";
navbar_list.appendChild(li_element_to_top);

for (const section of sections_list){
    let li_element = document.createElement("LI");
    li_element.innerHTML = section.dataset.nav;
    li_element.className = "menu__link";
    navbar_list.appendChild(li_element);
}

let navbar_menu = document.querySelector(".navbar__menu");
let menu_lists = document.querySelectorAll(".menu__link");

window.addEventListener("scroll", _.throttle(page_scroll, 200));

function page_scroll(event) {
    let closest_section_distance = 10000;
    let closest_section_index = -1;
    let current_active_section = document.querySelector(".your-active-class");
    for (const section of sections_list){
        let section_distance = section.getBoundingClientRect().y;
        if (Math.abs(section_distance) < closest_section_distance){
            closest_section_distance = Math.abs(section_distance);//you can optimize the approach cause you know that if the rel distance is increasing, then the next section are not candidates for the closest section
            closest_section_index = closest_section_index + 1;
        }
    }
    current_active_section.classList.remove("your-active-class");
    sections_list[closest_section_index].classList.add("your-active-class");
    // console.log(current_active_section.dataset.nav);
    for (const menu_list of menu_lists){
        if (menu_list.innerHTML == current_active_section.dataset.nav){
            menu_list.classList.remove("highlighted_link");
        } else if (menu_list.innerHTML == sections_list[closest_section_index].dataset.nav) {
            menu_list.classList.add("highlighted_link");
        }
    }
}

navbar_menu.addEventListener("click", nav_click);

// let current_active_section = document.querySelector(".your-active-class");
// console.log(current_active_section);

function nav_click(event) {
    let nav_section_text = event.target.innerHTML;
    let scrolling_value = 0;
    if (event.target.classList.contains("navbar_to_top")){
        window.scrollTo({top: 0, left: 0, behavior: "smooth"});
    } else {
        for (const section of sections_list) {//while loop is more efficient in this case or maybe not(since i need to remove the active class from the one the section that is not active)
            section.classList.remove("your-active-class");
            if (section.dataset.nav == nav_section_text){
                scrolling_value = section.getBoundingClientRect().y;
                section.classList.add("your-active-class");
            }//not efficient, should use a hash map instead
        }
        window.scrollBy({top: scrolling_value, left: 0, behavior: "smooth"});
    }
}


window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
        li_element_to_top.style.opacity = 1.0;
    } else if ((window.innerHeight + window.scrollY) < document.body.offsetHeight - 100) {
        li_element_to_top.style.opacity = 0.0;
    }
}
