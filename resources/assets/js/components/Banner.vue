<template>
    <section class="banner">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12 col-lg-6 banner__left">
                    <div class="banner__left__title">
                        <h1>Konkurs</h1>
                    </div>
                    <div class="banner__left__subtitle">
                        <h2>
                            <span>Dokonaj zakupu w --nazwa-firmy--</span> na kwotę minimum 100 zł, <span>zachowaj paragon</span> i <span>wykonaj zadanie konkursowe</span>.
                        </h2>
                    </div>
                    <a href="#form" @click.prevent="scrollFix('form')" class="btn-1">
                        <button>weź udział</button><span></span>
                    </a>
                    <div class="clearfix"></div>
                    <div class="banner__left__termin">
                        Na zgłoszenia czekamy od 23.04 <span></span> do 14.05.2018
                    </div>
                    <div class="banner__left__scroller">
                        
                    </div>
                </div>
                <div class="col-sm-12 col-lg-6 banner__right">
                    <div class="banner__right__image">
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        methods: {
            scrollFix: function(hash) {
                setTimeout(() => $('html, body').animate({
                scrollTop: $(hash).offset().top - 50
                }, 1000), 1)
            }
        }
    }
</script>

