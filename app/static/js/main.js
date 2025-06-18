document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const desertNav = document.querySelector('.desert-nav');
    
    menuToggle.addEventListener('click', function() {
        desertNav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.desert-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            desertNav.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
        });
    });
    
    // Sticky Header
    const header = document.querySelector('.desert-header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Back to Top Button
    const backToTopBtn = document.querySelector('#back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.desert-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Dictionary Words Data
    const dictionaryWords = [
        
  
  {
    "word": "الظو",
    "meaning": "النار",
    "example": "شعلوا الظو في البادية"
  },
  

  {
    "word": "أشطاري؟",
    "meaning": "ما الأخبار؟",
    "example": "أشطاري اليوم في السوق؟"
  },
  {
    "word": "الشهر مات",
    "meaning": "انتهى الشهر",
    "example": "الشهر مات ولا عندي فلس"
  },
  {
    "word": "الكدية",
    "meaning": " الجبل الصغير",
    "example": "   الكدية مزالت بعيدة "
  }


    ];
    
    // Load Dictionary Words
    const dictionaryGrid = document.getElementById('dictionary-words');
    let visibleWords = 6;
    
    function loadWords(count) {
        const wordsToShow = dictionaryWords.slice(0, count);
        dictionaryGrid.innerHTML = '';
        
        wordsToShow.forEach(word => {
            const wordCard = document.createElement('div');
            wordCard.className = 'word-card';
            wordCard.innerHTML = `
                <h3>${word.word}</h3>
                <p><strong>المعنى:</strong> ${word.meaning}</p>
                <p class="example">${word.example}</p>
            `;
            dictionaryGrid.appendChild(wordCard);
        });
    }
    
    // Initial load
    loadWords(visibleWords);
    
    // Load more words
    const loadMoreBtn = document.getElementById('load-more');
    loadMoreBtn.addEventListener('click', function() {
        visibleWords += 4;
        if (visibleWords >= dictionaryWords.length) {
            visibleWords = dictionaryWords.length;
            loadMoreBtn.style.display = 'none';
        }
        loadWords(visibleWords);
    });
    
    // Dictionary Search
    const searchInput = document.getElementById('search-term');
    const searchBtn = document.getElementById('search-btn');
    
    function searchWords() {
        const searchTerm = searchInput.value.toLowerCase();
        
        if (searchTerm.trim() === '') {
            loadWords(visibleWords);
            loadMoreBtn.style.display = 'block';
            return;
        }
        
        const filteredWords = dictionaryWords.filter(word => 
            word.word.toLowerCase().includes(searchTerm) || 
            word.meaning.toLowerCase().includes(searchTerm) ||
            word.example.toLowerCase().includes(searchTerm)
        );
        
        dictionaryGrid.innerHTML = '';
        
        if (filteredWords.length === 0) {
            dictionaryGrid.innerHTML = '<p class="no-results">لا توجد نتائج مطابقة للبحث</p>';
        } else {
            filteredWords.forEach(word => {
                const wordCard = document.createElement('div');
                wordCard.className = 'word-card';
                wordCard.innerHTML = `
                    <h3>${word.word}</h3>
                    <p><strong>المعنى:</strong> ${word.meaning}</p>
                    <p class="example">${word.example}</p>
                `;
                dictionaryGrid.appendChild(wordCard);
            });
        }
        
        loadMoreBtn.style.display = 'none';
    }
    
    searchBtn.addEventListener('click', searchWords);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchWords();
        }
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For this example, we'll just show an alert
            alert(`شكراً ${name} على رسالتك! سنتواصل معك قريباً.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Lazy Loading Images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Animation on Scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.about-content, .culture-card, .word-card, .gallery-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animated elements
    document.querySelectorAll('.about-content, .culture-card, .word-card, .gallery-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
});
