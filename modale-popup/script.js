window.addEventListener("DOMContentLoaded", () => {
    //Modale Popup
    const openModalePopupButton = document.querySelector(".modale-btn")
    const closeModalePopupButton = document.querySelector(".close-modale-btn")
    const modalePopupcontainer = document.querySelector(".modale-popup-container")
    openModalePopupButton.addEventListener("click", () => {
        modalePopupcontainer.style.display = "flex"
    })
    closeModalePopupButton.addEventListener("click", () => {
        modalePopupcontainer.style.display = "none"
    })

    //Non Modale Popup
    const nonModalePopupBtn = document.querySelector(".non-modale-btn")
    const nonModalePopupContainer = document.querySelector(".non-modale-popup")
    nonModalePopupBtn.addEventListener("click", () => {
        nonModalePopupContainer.style.display = "flex"
    })
    window.addEventListener("click", (event) => {
        if(event.target  !== nonModalePopupBtn && !nonModalePopupContainer.contains(event.target)){
        nonModalePopupContainer.style.display = "none"
        }
    })
    //Tooltip
    const showToolTipButton = document.querySelector(".tooltip-btn")
    const toolTipContainer = document.querySelector(".tooltip")
    showToolTipButton.addEventListener("mouseover", () => {
        toolTipContainer.style.display = "flex"
    })
    showToolTipButton.addEventListener("mouseout", () => {
        toolTipContainer.style.display = "none"
    })
    toolTipContainer.addEventListener("mouseover", () => {
        toolTipContainer.style.display = "flex"
    })
    toolTipContainer.addEventListener("mouseout", () => {
        toolTipContainer.style.display = "none"
    })
    //Alert 
    const messageButtonContainer = document.querySelector(".alert-message-buttons")
    const showAlertContainerBtn = document.querySelector(".alert-btn")
    const alertMessageContainer = document.querySelector(".alert-messages")
    const allAlertButtonTypes = document.querySelectorAll(".alert-message-buttons button")
    const alertErrorContainers = {
        alert: {
            message: "This Is Alert Message",
            icon: `<ion-icon name="alert-circle-outline"></ion-icon>`
        },
        error: {
            message: "This Is Error Message",
            icon: `<ion-icon name="close-circle-outline"></ion-icon>`
        },
        info: {
            message: "This Is Info Message",
            icon: `<ion-icon name="information-circle-outline"></ion-icon>`
        },
        warning: {
            message: "This Is Warning Message",
            icon: `<ion-icon name="warning-outline"></ion-icon>`
        },
        success: {
            message: "This Is Success Message",
            icon: `<ion-icon name="checkmark-outline"></ion-icon>`
        }
    }
    allAlertButtonTypes.forEach((button) => {
        button.addEventListener("click", () => {
            const elementContent = alertErrorContainers[`${button.className}`]
            const element = document.createElement("div")
            element.className = `${button.className} alert-box`
            element.innerHTML = `<p>${elementContent.message}</p> ${elementContent.icon}`
            console.log(element)
            alertMessageContainer.insertBefore(element, alertMessageContainer.firstChild)
            setTimeout(() => {
                alertMessageContainer.removeChild(element);
            }, 2000);
        })
    })
    showAlertContainerBtn.addEventListener("click", (event) => {
        if (event.target.innerText === "Show-Alert-Notification") {
            messageButtonContainer.style.display = "flex"
            event.target.innerText = "Hide-Alert-Notification"
        }
        else {
            messageButtonContainer.style.display = "none"
            event.target.innerText = "Show-Alert-Notification"
        }
    })


    //Context Menu
    const contextBtn = document.querySelector(".context-menu-btn");

    contextBtn.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        console.log(event);
        const contextElement = document.createElement("div");
        contextElement.innerHTML = '<p>This Is The Context Menu</p>';
        contextElement.style.position = "absolute";
        contextElement.style.top = `${event.clientY}px`;
        contextElement.style.left = `${event.clientX}px`;
        contextElement.style.backgroundColor = "#fff";
        contextElement.style.border = "1px solid #ccc";
        contextElement.style.padding = "10px";
        contextElement.style.zIndex = 1000;
        document.body.appendChild(contextElement);
        document.addEventListener("click", () => {
            if (contextElement) {
                contextElement.remove();
            }
        }, { once: true });
    });


    //Dropdown
    const dropDownBtn = document.querySelector(".drop-down-container")
    const dropDowncontainer = document.querySelector(".drop-down-links")
    dropDownBtn.addEventListener('mouseover', () => {
        dropDowncontainer.style.top = "3rem";
    })
    dropDownBtn.addEventListener("mouseout", () => {
        dropDowncontainer.style.top = "-10rem";
    })


    //Aside Panel
    const asidePanelContainer = document.querySelector(".aside-bar-container")
    const asideControlBtn = document.querySelector(".open-aside")
    asideControlBtn.addEventListener("click" , () => {
        if(event.target.className === "open-aside"){
            asidePanelContainer.style.left = "0px"
            event.target.className = "close-aside"
        }
        else{
            asidePanelContainer.style.left = "-200px"
            event.target.className = "open-aside"
        }
    })
})