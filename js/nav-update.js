// Navigation update script - This file contains the navigation HTML structure
// Use this to update navigation across all pages

const getNavigationHTML = (activePage) => {
    const isActive = (page) => activePage === page ? 'active' : '';
    const isDropdownActive = (pages) => pages.includes(activePage) ? 'active' : '';
    
    return `
            <ul class="navbar-nav ms-auto">
                <li class="nav-item"><a class="nav-link ${isActive('index')}" href="index.html">HOME</a></li>
                
                <!-- About -->
                <li class="nav-item"><a class="nav-link ${isActive('about')}" href="about.html">ABOUT US</a></li>
                
                <!-- Academics Dropdown -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle ${isDropdownActive(['courses', 'departments', 'admissions', 'fees-scholarships'])}" href="#" id="academicsDropdown" role="button" data-bs-toggle="dropdown">
                        ACADEMICS
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item ${isActive('courses')}" href="courses.html">COURSES</a></li>
                        <li><a class="dropdown-item ${isActive('departments')}" href="departments.html">DEPARTMENTS</a></li>
                        <li><a class="dropdown-item ${isActive('admissions')}" href="admissions.html">ADMISSIONS</a></li>
                        <li><a class="dropdown-item ${isActive('fees-scholarships')}" href="fees-scholarships.html">FEES</a></li>
                    </ul>
                </li>
                
                <!-- Campus Dropdown -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle ${isDropdownActive(['campus-life', 'facilities', 'gallery'])}" href="#" id="campusDropdown" role="button" data-bs-toggle="dropdown">
                        CAMPUS
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item ${isActive('campus-life')}" href="campus-life.html">CAMPUS LIFE</a></li>
                        <li><a class="dropdown-item ${isActive('facilities')}" href="facilities.html">FACILITIES</a></li>
                        <li><a class="dropdown-item ${isActive('gallery')}" href="gallery.html">GALLERY</a></li>
                    </ul>
                </li>
                
                <!-- More Dropdown -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle ${isDropdownActive(['placements', 'contact'])}" href="#" id="moreDropdown" role="button" data-bs-toggle="dropdown">
                        MORE
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item ${isActive('placements')}" href="placements.html">PLACEMENTS</a></li>
                        <li><a class="dropdown-item ${isActive('contact')}" href="contact.html">CONTACT</a></li>
                    </ul>
                </li>
                
                <!-- Login/Register Button -->
                <li class="nav-item">
                    <a class="nav-link btn-login ${isActive('login')}" href="login.html">LOGIN / REGISTER</a>
                </li>
            </ul>
    `;
};


