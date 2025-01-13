function locomotiveScrollAnime(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}

function loaderAnimation(){
    var loaderTimeline = gsap.timeline();

    loaderTimeline.from(".line h1,h2,h4",{
        y : 100,
        opacity : 0,
        duration : 0.5,
        stagger : 0.15 
    })
    loaderTimeline.to(".line h2",{
        opacity : 1,
        animationName : "now-animation",
    })
    loaderTimeline.from("#load-count",{
        opacity : 0,
        onStart : function(){
            var loaderCount = document.querySelector("#load-count>h6");
            var count = 0;
            var countInterval = setInterval(function(){
                if(count >= 100) {
                    clearInterval(countInterval);
                }
                loaderCount.textContent = count++;
            },25);
        }
    })
    loaderTimeline.to("#loader-page",{
        display : "none",
        opacity : 0,
        duration : 0.6,
        delay : 2.5,
        ease : Power4,
    })
    loaderTimeline.from("#page1",{
        opacity : 0,
        duration : 0.7,
        delay : 0.2,
        y : 1000,
        ease : Power4,
    })
    loaderTimeline.from("#nav-left",{
        opacity : 0
    })
    loaderTimeline.from(".page1-line h1,h3",{
        y : 100,
        opacity : 0,
        duration : 0.5,
        stagger : 0.1 
    })
}

function cursorAnimation(){
    document.addEventListener("mousemove",function(details){
        gsap.to("#cursor",{
            x : details.x,
            y : details.y,
        })
    })

    Shery.makeMagnet("#nav-right h3,#nav-left>svg:nth-child(1)");
}

locomotiveScrollAnime();

loaderAnimation();

cursorAnimation();

gsap.to("#scroll-text", {
    scrollTrigger: {
        scroller : "#main",
        trigger: "#page2",
        start: "top 85%",
        end: "bottom",
        scrub: true,
        onEnter: () => {
        document.querySelector("#scroll-text").style.display = "none";
        },
        onLeaveBack: () => {
        document.querySelector("#scroll-text").style.display = "block";
        }
    }
});
