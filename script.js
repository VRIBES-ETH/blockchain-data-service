// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Add click event listeners to all tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked tab
            button.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Notify Medium about size change
            setTimeout(function() {
                if (window.parent) {
                    const height = Math.max(800, document.body.scrollHeight);
                    window.parent.postMessage({ type: 'resize', height: height }, '*');
                }
            }, 100);
        });
    });
    
    // Ensure Medium receives proper sizing on load
    window.addEventListener('load', function() {
        setTimeout(function() {
            if (window.parent) {
                const height = Math.max(800, document.body.scrollHeight);
                window.parent.postMessage({ type: 'resize', height: height }, '*');
            }
        }, 500);
    });
    
    // Handle example interactions for the ZKP tab
    const exampleCase = document.querySelector('.example-case');
    if (exampleCase) {
        exampleCase.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    }
    
    // Initialize dot animation for payment flow
    function animatePaymentFlow() {
        const arrows = document.querySelectorAll('.payment-arrow');
        
        arrows.forEach((arrow, index) => {
            setTimeout(() => {
                arrow.classList.add('active');
                setTimeout(() => {
                    arrow.classList.remove('active');
                }, 700);
            }, index * 800);
        });
    }
    
    // Try to run the animation when the monetization tab becomes visible
    const monetizationTab = document.querySelector('[data-tab="monetization"]');
    if (monetizationTab) {
        monetizationTab.addEventListener('click', function() {
            setTimeout(animatePaymentFlow, 500);
            setInterval(animatePaymentFlow, 5000);
        });
    }
});
