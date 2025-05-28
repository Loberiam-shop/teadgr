// Script principal para o site Loberiam Shop
document.addEventListener('DOMContentLoaded', function() {
    // Botão voltar ao topo
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Máscaras para formulários
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            
            if (value.length > 9) {
                value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4');
            } else if (value.length > 6) {
                value = value.replace(/^(\d{3})(\d{3})(\d{0,3}).*/, '$1.$2.$3');
            } else if (value.length > 3) {
                value = value.replace(/^(\d{3})(\d{0,3}).*/, '$1.$2');
            }
            
            e.target.value = value;
        });
    }

    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            
            if (value.length > 6) {
                value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2');
            }
            
            e.target.value = value;
        });
    }

    // Menu mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', function() {
            navList.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Carrossel de produtos (se existir)
    const productCarousels = document.querySelectorAll('.product-carousel');
    
    if (productCarousels.length > 0) {
        productCarousels.forEach(carousel => {
            const prevBtn = carousel.querySelector('.carousel-prev');
            const nextBtn = carousel.querySelector('.carousel-next');
            const track = carousel.querySelector('.carousel-track');
            
            if (prevBtn && nextBtn && track) {
                const slideWidth = track.querySelector('.carousel-slide').offsetWidth;
                const slidesVisible = Math.floor(track.offsetWidth / slideWidth);
                const slidesCount = track.querySelectorAll('.carousel-slide').length;
                let currentPosition = 0;
                
                nextBtn.addEventListener('click', function() {
                    if (currentPosition < slidesCount - slidesVisible) {
                        currentPosition++;
                        track.style.transform = `translateX(-${currentPosition * slideWidth}px)`;
                    }
                });
                
                prevBtn.addEventListener('click', function() {
                    if (currentPosition > 0) {
                        currentPosition--;
                        track.style.transform = `translateX(-${currentPosition * slideWidth}px)`;
                    }
                });
            }
        });
    }

    // Validação de formulários
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredInputs = form.querySelectorAll('[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'Este campo é obrigatório';
                    
                    const existingError = input.parentNode.querySelector('.error-message');
                    if (!existingError) {
                        input.parentNode.appendChild(errorMsg);
                    }
                } else {
                    input.classList.remove('error');
                    const existingError = input.parentNode.querySelector('.error-message');
                    if (existingError) {
                        existingError.remove();
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    });

    // Adicionar ao carrinho (simulação)
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    
    if (addToCartBtns.length > 0) {
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const productId = this.getAttribute('data-product-id');
                const productName = this.getAttribute('data-product-name');
                const productPrice = this.getAttribute('data-product-price');
                
                // Simulação de adição ao carrinho
                alert(`Produto "${productName}" adicionado ao carrinho!`);
                
                // Atualizar contador do carrinho
                const cartCounter = document.querySelector('.cart-counter');
                if (cartCounter) {
                    let count = parseInt(cartCounter.textContent);
                    cartCounter.textContent = count + 1;
                }
            });
        });
    }
});
