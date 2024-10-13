$(document).ready(function () {
     new WOW({
         animateClass: 'animate__animated',
    }).init();


    //https://atuin.ru/blog/diagonalnaya-karusel-fotografij/

    let startX = 0
    let active = 0
    let isDown = false
    const speedDrag = -0.1
    const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))
    const carousel = document.querySelector('.carousel')
    const $items = document.querySelectorAll('.carousel-item')
    let progress = 10 * $items.length / 2
    const displayItems = (item, index, active) => {
        const zIndex = getZindex([...$items], active)[index]
        item.style.setProperty('--zIndex', zIndex)
        item.style.setProperty('--active', (index-active)/$items.length)
        item.style.setProperty('--items', $items.length)
    }
    const animate = () => {
        progress = Math.max(0, Math.min(progress, $items.length * 10))
        active = Math.floor(progress/($items.length * 10) * ($items.length-1))
        $items.forEach((item, index) => displayItems(item, index, active))
    }
    animate()
    $items.forEach((item, i) => {
        item.addEventListener('click', () => {
            progress = (i/$items.length) * $items.length * 10 + 10
            animate()
        })
    })
    const handleMouseMove = (e) => {
        if (!isDown) return
        const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
        const mouseProgress = (x - startX) * speedDrag
        progress = progress + mouseProgress
        startX = x
        animate()
    }
    const handleMouseDown = e => {
        isDown = true
        startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
    }
    const handleMouseUp = () => {
        isDown = false
    }
    carousel.addEventListener('mousedown', handleMouseDown)
    carousel.addEventListener('mousemove', handleMouseMove)
    carousel.addEventListener('mouseup', handleMouseUp)
    carousel.addEventListener('touchstart', handleMouseDown)
    carousel.addEventListener('touchmove', handleMouseMove)
    carousel.addEventListener('touchend', handleMouseUp)

    const portfolioPopUp = $('#portfolio-pop-up')

    $('.carousel-item').dblclick(function() {

        const imageSrc = $(this).find('img').attr('src');
        const newImage = `<img src="${imageSrc}" alt="Изображение" class="portfolio-pop-up-img"/> <div class="close-pop-up">Двойной клик чтобы закрыть</div>`;

        portfolioPopUp.html(newImage).css('display', 'flex');

    });

    $(window).dblclick((e) => {
        if ($(e.target).is($('.portfolio-pop-up-img'))||$(e.target).is($('.portfolio-pop-up'))) {
            portfolioPopUp.css({display: 'none'});
        }
    });

    let constraints = {
        name: {
            presence: true,
            length: {
                minimum: 2,
                message: "Введите корректное имя"
            }
        },

        phone: {
            presence: true,
            numericality: {
                onlyInteger: true,
                greaterThanOrEqualTo: 1000000000,
                lessThanOrEqualTo: 9999999999,
                message: "Введите корректный номер"
            }
        },
    };

    var form = document.querySelector("#order-form");
    form.addEventListener("submit", function(ev) {
        ev.preventDefault();
        handleFormSubmit(form);
    });

    function handleFormSubmit(form) {
        // Получаем значения полей формы
        const formData = new FormData(form);

        // Отладка - выводим значения полей в консоль
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        var errors = validate(formData, constraints);

        if (errors) {
            showErrors(form, errors);
        } else {
            alert("Форма успешно отправлена!"); // Здесь можно отправить форму или выполнить другие действия
            // form.submit(); // Если хотите отправить форму после успешной валидации
        }
    }

    function showErrors(form, errors) {
        // Удаляем предыдущие ошибки
        var errorElements = form.querySelectorAll(".error-message");
        errorElements.forEach(function(el) {
            el.remove();
        });

        Object.keys(errors).forEach(function(key) {
            var messages = errors[key];
            messages.forEach(function(message) {
                var inputField = form.querySelector(`#${key}`);
                var errorMessage = document.createElement("div");
                errorMessage.className = "error-message text-danger"; // Добавляем класс для стилей
                errorMessage.innerText = message;
                inputField.parentNode.insertBefore(errorMessage, inputField.nextSibling);
            });
        });
    }
});