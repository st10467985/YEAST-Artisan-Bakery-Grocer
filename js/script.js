
// YEAST Artisan Bakery & Grocer
// JavaScript functionality

document.addEventListener("DOMContentLoaded", function () {

    console.log("YEAST website JavaScript loaded successfully.");

    // Dynamically load product descriptions
    const productDescriptions = {
        breads: "Our bread selection includes artisan breads such as sourdough, ciabatta, rye bread and baguettes.",
        cakes: "A selection of cakes and sweet baked products.",
        pastries: "Fresh pastries and other sweet bakery products.",
        savoury: "Savoury bakery products including quiches and other savoury items.",
        other: "Other baked goods including Chelsea buns and doughnuts.",
        grocery: "A selection of grocery products available from YEAST Artisan Bakery & Grocer."
    };

    document.querySelectorAll(".dynamic-description").forEach(function (description) {

        const category = description.getAttribute("data-category");

        if (productDescriptions[category]) {
            description.textContent = productDescriptions[category];
        }

    });

    // Interactive product tabs
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabPanels = document.querySelectorAll(".tab-panel");

    let activeTab = "breads";

    // Product search elements
    const productSearch = document.getElementById("productSearch");
    const products = document.querySelectorAll(".product-item");
    const searchMessage = document.getElementById("searchMessage");

    function showProductTab(tabId) {

        activeTab = tabId;

        tabButtons.forEach(function (button) {

            const isActive = button.getAttribute("aria-controls") === tabId;

            button.classList.toggle("active", isActive);
            button.setAttribute("aria-selected", isActive ? "true" : "false");
            button.setAttribute("tabindex", isActive ? "0" : "-1");

        });

        tabPanels.forEach(function (panel) {

            panel.hidden = panel.id !== tabId;

        });

    }

    if (tabButtons.length > 0 && tabPanels.length > 0) {

        tabButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const selectedTab = button.getAttribute("aria-controls");

                if (selectedTab) {
                    showProductTab(selectedTab);
                }

                // Clear search when changing categories
                if (productSearch) {
                    productSearch.value = "";
                }

                if (searchMessage) {
                    searchMessage.textContent = "";
                }

            });

            // Keyboard navigation between tabs
            button.addEventListener("keydown", function (event) {

                const currentIndex = Array.from(tabButtons).indexOf(button);
                let nextIndex = currentIndex;

                if (event.key === "ArrowRight") {
                    nextIndex = (currentIndex + 1) % tabButtons.length;
                } else if (event.key === "ArrowLeft") {
                    nextIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
                } else if (event.key === "Home") {
                    nextIndex = 0;
                } else if (event.key === "End") {
                    nextIndex = tabButtons.length - 1;
                } else {
                    return;
                }

                event.preventDefault();

                tabButtons[nextIndex].focus();
                tabButtons[nextIndex].click();

            });

        });

        showProductTab(activeTab);

    }

    // Product search functionality
    if (productSearch) {

        productSearch.addEventListener("input", function () {

            const searchValue = productSearch.value.toLowerCase().trim();
            let visibleProducts = 0;

            if (searchValue === "") {

                products.forEach(function (product) {
                    product.hidden = product.id !== activeTab;
                });

                if (searchMessage) {
                    searchMessage.textContent = "";
                }

                return;
            }

            products.forEach(function (product) {

                const productText = product.textContent.toLowerCase();
                const matches = productText.includes(searchValue);

                product.hidden = !matches;

                if (matches) {
                    visibleProducts++;
                }

            });

            if (searchMessage) {

                if (visibleProducts === 0) {
                    searchMessage.textContent = "No matching products found.";
                } else {
                    searchMessage.textContent =
                        visibleProducts + " product category/categories found.";
                }

            }

        });

    }

    // Product image lightbox functionality
    const productImages = document.querySelectorAll(".product-item img");

    if (productImages.length > 0) {

        const lightbox = document.createElement("div");

        lightbox.id = "productLightbox";

        lightbox.style.cssText = `
            display: none;
            position: fixed;
            z-index: 1000;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            justify-content: center;
            align-items: center;
            padding: 20px;
            box-sizing: border-box;
        `;

        const enlargedImage = document.createElement("img");

        enlargedImage.style.cssText = `
            max-width: 90%;
            max-height: 85%;
            object-fit: contain;
        `;

        const closeButton = document.createElement("button");

        closeButton.textContent = "×";
        closeButton.setAttribute("aria-label", "Close image");

        closeButton.style.cssText = `
            position: absolute;
            top: 15px;
            right: 25px;
            font-size: 40px;
            color: white;
            background: none;
            border: none;
            cursor: pointer;
        `;

        lightbox.appendChild(enlargedImage);
        lightbox.appendChild(closeButton);
        document.body.appendChild(lightbox);

        function closeLightbox() {
            lightbox.style.display = "none";
        }

        productImages.forEach(function (image) {

            image.style.cursor = "pointer";

            image.addEventListener("click", function () {

                enlargedImage.src = image.src;
                enlargedImage.alt = image.alt;

                lightbox.style.display = "flex";

            });

        });

        closeButton.addEventListener("click", closeLightbox);

        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {
                closeLightbox();
            }

        });

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                closeLightbox();
            }

        });

    }

    // Product enquiry modal functionality
    const enquiryModal = document.getElementById("enquiryModal");
    const openEnquiryModal = document.getElementById("openEnquiryModal");
    const closeEnquiryModal = document.getElementById("closeEnquiryModal");

    if (enquiryModal && openEnquiryModal && closeEnquiryModal) {

        // Open the modal
        openEnquiryModal.addEventListener("click", function () {

            enquiryModal.style.display = "flex";
            enquiryModal.setAttribute("aria-hidden", "false");

            closeEnquiryModal.focus();

        });

        // Close the modal
        function closeProductEnquiryModal() {

            enquiryModal.style.display = "none";
            enquiryModal.setAttribute("aria-hidden", "true");

            openEnquiryModal.focus();

        }

        closeEnquiryModal.addEventListener("click", closeProductEnquiryModal);

        // Close when clicking outside the modal content
        enquiryModal.addEventListener("click", function (event) {

            if (event.target === enquiryModal) {
                closeProductEnquiryModal();
            }

        });

        // Close the modal using the Escape key
        document.addEventListener("keydown", function (event) {

            if (
                event.key === "Escape" &&
                enquiryModal.style.display === "flex"
            ) {
                closeProductEnquiryModal();
            }

        });

    }

    // Interactive Leaflet map functionality
    const mapElement = document.getElementById("yeastMap");

    if (mapElement && typeof L !== "undefined") {

        const map = L.map("yeastMap").setView([-26.15, 28.14], 13);

        // Esri World Street Map tiles
        L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
            {
                attribution: "Tiles &copy; Esri",
                maxZoom: 19
            }
        ).addTo(map);

        // YEAST Bedfordview location
        const bedfordview = L.marker([-26.1700, 28.1360]).addTo(map);

        bedfordview.bindPopup(
            "<strong>YEAST Artisan Bakery & Grocer - Bedfordview</strong><br>" +
            "55 Van Buuren Road, Bedfordview<br>" +
            "Phone: 060 761 3077"
        );

        // YEAST Dunvegan location
        const dunvegan = L.marker([-26.1320, 28.1390]).addTo(map);

        dunvegan.bindPopup(
            "<strong>YEAST Artisan Bakery & Grocer - Dunvegan</strong><br>" +
            "79 Dunvegan Avenue, Dunvegan, Edenvale<br>" +
            "Phone: 072 445 6090"
        );

        // Display both locations
        map.fitBounds([
            [-26.1700, 28.1360],
            [-26.1320, 28.1390]
        ], { padding: [30, 30] });

    } else if (mapElement) {

        mapElement.textContent =
            "The map could not be loaded. Please check the Leaflet library connection.";

    }

    // Enquiry form validation and response
    const enquiryForm = document.getElementById("enquiryForm");
    const enquiryResponse = document.getElementById("enquiryResponse");

    if (enquiryForm) {

        enquiryForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!enquiryForm.checkValidity()) {
                enquiryForm.reportValidity();
                return;
            }

            const customerName = document.getElementById("name").value.trim();
            const customerEmail = document.getElementById("email").value.trim();
            const customerPhone = document.getElementById("phone").value.trim();
            const enquiryType = document.getElementById("enquiryType").value;
            const requestedProduct = document.getElementById("product").value.trim();
            const quantity = document.getElementById("quantity").value;
            const customerMessage = document.getElementById("message").value.trim();

            if (
                customerName.length < 2 ||
                requestedProduct.length < 2 ||
                customerMessage.length < 10
            ) {
                enquiryResponse.textContent =
                    "Please check your details and complete all required fields correctly.";
                return;
            }

            enquiryResponse.textContent =
                "Thank you, " + customerName +
                ". Your enquiry has been completed successfully. " +
                "Enquiry type: " + enquiryType + ". " +
                "Requested item: " + requestedProduct + ". " +
                "Quantity: " + quantity + ". " +
                "We will use " + customerEmail +
                " or " + customerPhone +
                " as your contact details. Your enquiry details have been displayed successfully.";

            enquiryForm.reset();

        });

    }

    // Contact form validation and Gmail functionality
    const contactForm = document.getElementById("contactForm");
    const contactResponse = document.getElementById("contactResponse");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const customerName =
                document.getElementById("contactName").value.trim();

            const customerEmail =
                document.getElementById("contactEmail").value.trim();

            const customerPhone =
                document.getElementById("contactPhone").value.trim();

            const messageType =
                document.getElementById("messageType").value;

            const customerMessage =
                document.getElementById("contactMessage").value.trim();

            if (customerName.length < 2 || customerMessage.length < 10) {
                contactResponse.textContent =
                    "Please check your details and complete the form correctly.";
                return;
            }

            const recipient = "ntsakothandi50@gmail.com";

            const subject = encodeURIComponent(
                "YEAST Website - " + messageType
            );

            const body = encodeURIComponent(
                "Customer Name: " + customerName + "\n" +
                "Email Address: " + customerEmail + "\n" +
                "Phone Number: " + customerPhone + "\n" +
                "Message Type: " + messageType + "\n\n" +
                "Message:\n" + customerMessage
            );

            const gmailLink =
                "https://mail.google.com/mail/?view=cm&fs=1" +
                "&to=" + encodeURIComponent(recipient) +
                "&su=" + subject +
                "&body=" + body;

            contactResponse.textContent =
                "Your message is ready. Gmail will open so you can review and send it.";

            window.open(gmailLink, "_blank");

        });

    }

});
