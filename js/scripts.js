document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.container');
    const chartGroups = document.querySelectorAll('.chart-group');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;

    function scrollToIndex(index) {
        if (index >= 0 && index < chartGroups.length) {
            const topPosition = chartGroups[index].offsetTop - container.offsetTop;
            container.scrollTo({
                top: topPosition,
                behavior: 'smooth'
            });
            currentIndex = index;
            updateDots();
            updateTitle(index);
        }
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function updateTitle(index) {
        if (index >= 6) {
            document.querySelectorAll('h1')[1].textContent = "II  关系分析";
        } else {
            document.querySelectorAll('h1')[1].textContent = "I  总览";
        }
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            scrollToIndex(index);
        });
    });

    // 使用 IntersectionObserver 更新 currentIndex 和标题
    chartGroups.forEach((group, index) => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    currentIndex = index;
                    updateDots();
                    updateTitle(index);
                }
            });
        }, {
            root: container,
            threshold: 0.5
        });
        observer.observe(group);
    });

    // 初始化第一个圆点的样式和标题
    updateDots();
    updateTitle(currentIndex);
});