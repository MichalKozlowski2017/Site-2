
<template>
    <section class="shop">
        <div class="container-fluid">
            <div class="row">
                <div class="shop__left col-sm-12 col-md-6">
                    <h2>
                        nowa <br>kolekcja
                    </h2>
                    <div>
                        <div class="shop__left__cta ">
                            <a href="https://--nazwa-firmy--.com/" target="_blank" class="btn-1">
                                <button>zobacz wszystkie produkty</button><span></span>
                            </a>
                            <div class="clearfix"></div>
                        </div>
                        <div class="shop__left__line d-block d-md-none"></div>
                    </div>
                    
                </div>
                <div class="shop__right col-sm-12 col-md-6" >
                    <div class="shop__right__header">
                        <div class="shop__right__header__left">

                        </div>
                        <div class="shop__right__header__right">
                            <div class="shop__right__header__right__gender">
                                <a @click.prevent="changeGender('female', $event)" href="#" class="shop__right__header__right__gender__female gender-active">
                                   DLA NIEJ
                                </a>
                                <a @click.prevent="changeGender('male', $event)" href="#" class="shop__right__header__right__gender__male">
                                   DLA NIEGO
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="shop__right__nav">
                        <div class="shop__right__nav__arrows">
                            <div class="shop__right__nav__arrows__prev" @click="prev">
                                
                            </div>
                            <div class="shop__right__nav__arrows__next" @click="next">
                                
                            </div>
                        </div>
                    </div>
                    <div class="products">
                        <div class="products__item" v-for="(item, index) in filteredProducts" :class="{'products__item--active': index == currentItem}">
                            <div v-for="(variant, index) in item.options" class="shop__right__product" :class="{'shop__right__product--active': index == 0}" :style="{ backgroundImage: 'url(' + variant.image + ')' }">
                                
                            </div>

                            <h2 class="shop__right__product-name">
                                {{ item.name }}
                            </h2>
                            
                            
                            <div class="shop__right__price">
                                <p>{{ item.price }}<span> PLN</span></p>
                            </div>
                            <div class="shop__right__footer">
                                <div class="shop__right__footer__colors">
                                    <div v-for="(color, index) in item.options">
                                        <!-- <img :src="color.image" alt=""> -->
                                        <div @click.prevent.self="changeImage(index)" class="shop__right__footer__colors__color" :style="{ background: 'linear-gradient(135deg, ' + color.color1 + ' 0%,' + color.color1 + ' 50%,' + color.color2 + ' 50%,' + color.color2 + ' 100%)'}">
                                    </div>
                                    
                                        
                                    </div>
                                </div>
                                <div class="shop__right__footer__cart">
                                    <a href="https://--nazwa-firmy--.com/" target="_blank">
                                        przejdź do sklepu <span></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
               products: [],
               filteredProducts: [],
               currentItem: 0,
               currentVariant: 0,
               currentGender: 'female'
            }
        },
        watch: {
            products() {
                this.filteredProducts = this.products.filter(function(obj) {
                    return obj.gender == this.currentGender;
                }.bind(this));
            },
            currentGender() {
                this.filteredProducts = this.products.filter(function(obj) {
                    return obj.gender == this.currentGender;
                }.bind(this));
                this.currentItem = 0;
                this.currentVariant = 0;
            },
            currentVariant() {
                $('.products__item--active').find('.shop__right__product').removeClass('shop__right__product--active');
                $('.products__item--active').find('.shop__right__product').eq(this.currentVariant).addClass('shop__right__product--active');
            }
        },
        mounted() {

        },
        methods: {
            prev: function () {
                this.currentItem--;
                if (this.currentItem < 0) {
                    this.currentItem = this.filteredProducts.length - 1;
                }
            },
            next: function (e) {
                this.currentItem++;
                if (this.currentItem > this.filteredProducts.length - 1) {
                    this.currentItem = 0;
                }
            },
            changeImage(index) {
                // to można lepiej
                this.currentVariant = index;
                $('.products__item--active').find('.shop__right__product').removeClass('shop__right__product--active');
                $('.products__item--active').find('.shop__right__product').eq(this.currentVariant).addClass('shop__right__product--active');
            },
            changeGender(gender, event) {
                this.currentGender = gender;
                $('.shop__right__header__right__gender').find('a').removeClass('gender-active');
                event.target.classList.add('gender-active');
            }
        },
        created() {
            axios.get('/js/data/shop.json')
            .then(response => {
                this.products = response.data.products;
            })
        }
    }
</script>

