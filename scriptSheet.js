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
    loaderTimeline.from(".page1-line h1,.page1-line h3",{
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

function flagAnimation(){

    document.addEventListener("mousemove",function(details){
        gsap.to("#flag",{
            x: details.x,
            y : details.y,
        })
    })

    document.querySelector(".page1-line:nth-of-type(4)").addEventListener("mouseenter",function(details){
        gsap.to("#flag",{
            opacity : 1,
        })
    })

    document.querySelector(".page1-line:nth-of-type(4)").addEventListener("mouseleave",function(details){
        gsap.to("#flag",{
            opacity : 0,
        })
    })

}

function imgHoverAnimation(){
    Shery.imageEffect(".img-div",{
        style: 5,
        config:{"a":{"value":1.37,"range":[0,30]},
        "b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},
        "aspect":{"value":0.7518907498625488},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},
        "shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},
        "shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},
        "infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},
        "durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},
        "masker":{"value":true},"maskVal":{"value":1.27,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},
        "noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.84,"range":[0,10]},
        "metaball":{"value":0.4,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},
        "antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.34,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}},
        gooey:true,
    })
}

function page2Animations(){
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
    
    gsap.to("#page2",{
        scrollTrigger : {
            scroller : "#main",
            trigger : "#page2",
            end: "bottom 65%",
            pin : "#page2",
            scrub : true,
        },
    })
}

function videoAnimations(){
    var videoContainer = document.querySelector("#page2-video-container");
    videoContainer.addEventListener("mouseenter", function(){
        videoContainer.addEventListener("mousemove", function(details){
            gsap.to("#video-cursor",{
                left : details.x - 510,
                y : details.y - 110,
            })
        })
    })

    videoContainer.addEventListener("mouseleave",function(){
        gsap.to("#video-cursor",{
            left : "60%",
            y : "-10%",
        })
    })


    var videoButton = document.querySelector("#video-cursor");
    var video = document.querySelector("#page2-video-container video");

    videoButton.addEventListener("click",function playPauseVideo(){

        if(document.querySelector("#video-cursor").innerHTML === `<i class="ri-play-large-fill"></i>`){
            gsap.to("#page2-video-container img",{
                opacity : 0,
            })
    
            video.play();
    
            document.querySelector("#video-cursor").innerHTML = `<i class="ri-pause-mini-line" style="margin-left: 24%;"></i>`;
    
            gsap.to("#video-cursor",{
                rotate : "360deg",
                scale : 0.5,
            })
        }
        else{
            video.pause();
    
            gsap.to("#page2-video-container img",{
                opacity : 1,
            })

            gsap.to("#video-cursor",{
                rotate : "360deg",
                scale : 1,
            })
    
            document.querySelector("#video-cursor").innerHTML = `<i class="ri-play-large-fill"></i>`;
        }

    });
}

function page6H1Animation(){
    var page6H1 = document.querySelector("#page6Head>h1");

    page6H1.addEventListener("mouseenter",function(){
        $(page6H1).textillate('start'); 

        $(page6H1).textillate({
            in : {
                effect : 'fadeIn',
            },
        });
    })

    page6H1.addEventListener("mouseleave",function(){
        $(page6H1).textillate('start'); 

        $(page6H1).textillate({
            in : {
                effect : 'fadeIn',
            },
        });
    })
}

function textAnimation(){
    var text = document.querySelectorAll(".text-container>h3");

    text.forEach(function(elem){
        elem.addEventListener("mouseenter",function(){
            $(elem).textillate('start'); 
        
            $(elem).textillate({
                in : {
                    effect : 'fadeInUp',
                },
            });
        })
    })
}
locomotiveScrollAnime();

loaderAnimation();

cursorAnimation();

ScrollTrigger.create({
    scroller:"#main",
    start:"30% 25%",
    end: "30% 40%",

    onEnter : () => {
        gsap.to("#nav",{
            opacity : 0,
            y : -20,
        })
    },
    onLeaveBack : () => {
        gsap.to("#nav",{
            opacity : 1,
            y : 20
        })
    },
});

flagAnimation();

imgHoverAnimation();

page2Animations();

videoAnimations();

textAnimation();

gsap.from("#page3>h1,#page3>.underline",{
    x : 100,
    opacity : 0,
    scrollTrigger :{
        trigger :"#page3",
        scroller : "#main",
        start : "top 85%",
    }
})

ScrollTrigger.create({
    trigger :"#page4",
    scroller : "#main",
    start : "top 85%",

    onEnter : () => {
        var page4Timeline = gsap.timeline();
        page4Timeline.from("#page4>h3,#page4-content>h1",{
            x: 100,
            opacity : 0,
        })
        page4Timeline.from("#page4-content>p,#page4-img-para>p",{
            opacity : 0,
            duration : 0.5,
        })
        page4Timeline.from("#page4-content>#awards",{
            opacity : 0,
            y : 100,           
            duration : 2,
        })
    }
})

gsap.from("#page6>h3,#page6Head",{
    x : 100,
    opacity : 0,
    scrollTrigger :{
        trigger :"#page6",
        scroller : "#main",
        start : "top 85%",
    }
})

page6H1Animation();

