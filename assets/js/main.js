document.addEventListener('DOMContentLoaded', () => {
    // FAQ Toggle
    const toggles = document.querySelectorAll('.elementor-tab-title');
    
    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const contentId = toggle.getAttribute('aria-controls');
            const content = document.getElementById(contentId);
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            
            // Close all others (optional, but good for accordion behavior)
            // toggles.forEach(t => {
            //     if (t !== toggle) {
            //         t.setAttribute('aria-expanded', 'false');
            //         const c = document.getElementById(t.getAttribute('aria-controls'));
            //         if(c) c.style.display = 'none';
            //     }
            // });

            // Toggle current
            toggle.setAttribute('aria-expanded', !isExpanded);
            if (content) {
                content.style.display = isExpanded ? 'none' : 'block';
            }
            
            // Toggle Icons
            const iconClosed = toggle.querySelector('.elementor-toggle-icon-closed');
            const iconOpened = toggle.querySelector('.elementor-toggle-icon-opened');
            
            if (iconClosed && iconOpened) {
                if (isExpanded) {
                    iconClosed.style.display = 'block';
                    iconOpened.style.display = 'none';
                } else {
                    iconClosed.style.display = 'none';
                    iconOpened.style.display = 'block';
                }
            }
        });
    });

    const externalLazyImages = document.querySelectorAll('img[data-src]');
    externalLazyImages.forEach(img => {
        const url = img.getAttribute('data-src');
        if (url && !img.getAttribute('src')) {
            img.setAttribute('src', url);
        }
    });

    const brokenSourceMap = {
        'assets/img/jigsaw.png': 'assets/img/exclaim.png',
        'assets/img/book-1.png': 'assets/img/pencil.png',
        'assets/img/read.png': 'assets/img/email_4.png',
        'assets/img/FRAFISMO-FONETICO-ALFABETO-CADERNO-COM-ALFABETO.webp': 'assets/img/GRAFISMO-FONETICO-ALFABETO-CADERNO-ALFABETO-COM-CARINHAS.webp',
        '../../ik.imagekit.io/RossCDN/facebook/social-plugin/h/42.jpg': 'https://ik.imagekit.io/RossCDN/facebook/social-plugin/h/42.jpg',
        'https://members.rossdigitall.com/assets/img/fakebook/face-icon.png': 'assets/img/exclaim.png'
    };

    const allImages = document.querySelectorAll('img');
    allImages.forEach((img, index) => {
        const src = img.getAttribute('src');
        if (src && brokenSourceMap[src]) {
            img.setAttribute('src', brokenSourceMap[src]);
        }
        if (index === 0) {
            img.removeAttribute('loading');
        } else if (!img.getAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        if (!img.getAttribute('decoding')) {
            img.setAttribute('decoding', 'async');
        }
    });

    const carousels = document.querySelectorAll('.elementor-image-carousel');
    carousels.forEach(container => {
        container.style.overflowX = 'auto';
        container.style.display = 'flex';
        container.style.scrollSnapType = 'x mandatory';
        const children = container.children;
        const wrapper = container.querySelector('.swiper-wrapper');
        if (wrapper) {
            wrapper.style.display = 'flex';
            wrapper.style.overflowX = 'auto';
            wrapper.style.scrollBehavior = 'smooth';
        }
    });

    const carouselImages = document.querySelectorAll('.elementor-image-carousel .swiper-slide-image');
    if (carouselImages.length) {
        const fallbackSources = [
            'assets/img/GRAFISMO-FONETICO-ALFABETO-CADERNO-ALFABETO-COM-CARINHAS.webp',
            'assets/img/GRAFISMO-FONETICO-ALFABETO-CADERNO-ALFABETO-COM-RELOGIO.webp',
            'assets/img/GRAFISMO-FONETICO-ALFABETO-CADERNO-ALFABETO-COM-TRACADO.webp',
            'assets/img/GRAFISMO-FONETICO-ALFABETO-CADERNO-FORMANDO-PALAVRAS.webp',
            'assets/img/GRAFISMO-FONETICO-ALFABETO-QUEBRA-CABECA-COM-ALFABETO.webp'
        ];
        carouselImages.forEach((img, index) => {
            const currentSrc = img.getAttribute('src') || '';
            if (!currentSrc || currentSrc.indexOf('AnyConv.com__') !== -1) {
                const replacement = fallbackSources[index % fallbackSources.length];
                img.setAttribute('src', replacement);
            }
            if (index === 0) {
                img.removeAttribute('loading');
            } else {
                img.setAttribute('loading', 'lazy');
            }
            img.setAttribute('decoding', 'async');
            if (!img.getAttribute('width')) {
                img.setAttribute('width', '512');
            }
            if (!img.getAttribute('height')) {
                img.setAttribute('height', '512');
            }
        });
    }

    const swiperPagination = document.querySelector('.swiper-pagination');
    if (swiperPagination) {
        swiperPagination.style.display = 'none';
    }

    const videoElementor = document.querySelector('#video .elementor-widget-container');
    if (videoElementor) {
        videoElementor.innerHTML = `
<div id="vsl-container-772" style="position: relative; width: 100%; max-width: 400px; margin: 20px auto 16px; aspect-ratio: 9/16; background: #000; border-radius: 15px; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.5); font-family: sans-serif;">
    <video id="vsl-video" autoplay muted playsinline onclick="togglePlay()" style="width: 100%; height: 100%; object-fit: cover; cursor: pointer;">
        <source src="https://nustzeypnuplleahybfn.supabase.co/storage/v1/object/public/VSL/vsl.mp4" type="video/mp4">
    </video>
    <div id="vsl-overlay" onclick="primeiroClique()" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 30;">
        <div style="background: #2563eb; color: white; padding: 15px 25px; border-radius: 50px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px #2563eb66;">
            🔊 CLIQUE PARA OUVIR
        </div>
    </div>
    <div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 12px; background: rgba(255,255,255,0.2); z-index: 25;">
        <div id="progress-bar" style="width: 0%; height: 100%; background: #2563eb; transition: width 0.1s linear;"></div>
    </div>
</div>
<div style="max-width: 400px; margin: 0 auto 4px; text-align: center;">
    <div class="elementor-button-wrapper" style="max-width: 260px; margin: 0 auto;">
        <a href="#VALOR" class="elementor-button elementor-button-link elementor-size-sm elementor-animation-grow video-cta-button">
            <span class="elementor-button-content-wrapper">
                <span class="elementor-button-text">QUERO AS ATIVIDADES</span>
            </span>
        </a>
    </div>
</div>
        `;
        const vslVideo = document.getElementById('vsl-video');
        const progressBar = document.getElementById('progress-bar');
        const curvatura = 0.5;
        if (vslVideo && progressBar) {
            vslVideo.addEventListener('timeupdate', () => {
                if (vslVideo.duration) {
                    const pct = Math.pow(vslVideo.currentTime / vslVideo.duration, curvatura) * 100;
                    progressBar.style.width = pct + '%';
                }
            });
            vslVideo.addEventListener('ended', () => {
                progressBar.style.width = '100%';
            });
            window.primeiroClique = function () {
                if (!vslVideo) {
                    return;
                }
                vslVideo.muted = false;
                vslVideo.currentTime = 0;
                vslVideo.play();
                const overlay = document.getElementById('vsl-overlay');
                if (overlay) {
                    overlay.style.display = 'none';
                }
            };
            window.togglePlay = function () {
                if (!vslVideo) {
                    return;
                }
                if (vslVideo.paused) {
                    vslVideo.play();
                } else {
                    vslVideo.pause();
                }
            };
        }
    }

    // Smooth Scroll for buttons
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
        if (anchor.classList.contains('plano-botao-basico')) {
            return;
        }
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Upsell Popup Logic (Delegated Event Handling)
    document.addEventListener('click', function (e) {
        // 1. Open Popup (Click on Basic Button)
        const basicBtn = e.target.closest('.plano-botao-basico');
        if (basicBtn) {
            e.preventDefault(); // Prevent navigation to checkout
            e.stopPropagation();
            e.stopImmediatePropagation();
            console.log('Basic button clicked - Popup triggered');
            
            const overlay = document.getElementById('upsell-overlay');
            if (overlay) {
                overlay.classList.add('is-visible');
            }
            return;
        }

        // 2. Close Popup (Click on Overlay background or Close button)
        const overlay = document.getElementById('upsell-overlay');
        if (overlay && overlay.classList.contains('is-visible')) {
            // Close if clicked on the overlay background (outside modal)
            if (e.target === overlay) {
                overlay.classList.remove('is-visible');
            }
            // Close if clicked on the X button
            if (e.target.closest('.upsell-close')) {
                overlay.classList.remove('is-visible');
            }
        }
    });

    const basicList = document.querySelector('[data-id="plano-basico"] .plano-basico-lista');
    if (basicList && !basicList.getAttribute('data-updated')) {
        basicList.innerHTML =
            '<p>✅ 50 Atividades de Grafismo (Nível 1 apenas)</p>' +
            '<p>✅ Arquivos em PDF para imprimir</p>' +
            '<p>✅ Acesso Digital Imediato</p>' +
            '<p>❌ SEM os 6 Cadernos de Bônus</p>' +
            '<p>❌ SEM o Kit de Alfabetização</p>' +
            '<p>❌ SEM Suporte Prioritário</p>';
        basicList.setAttribute('data-updated', 'true');
    }

});
