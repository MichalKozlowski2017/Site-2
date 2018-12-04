<template>
    <section class="form form--step1" ref="formContainer" id="form">
        <div class="container-fluid">
            <div class="form__steps row" ref="steps">
                <div id="stepIndicator1" class="form__steps__step col-sm-6"></div>
                <div id="stepIndicator2" class="form__steps__step col-sm-6"></div>
            </div>

            <form action="" class="row" @submit.prevent="handleSubmit" ref="form">
                <!-- btn z kroku 2 do 1 na duże ekrany -->
                <a class="form__back d-none d-lg-block" href="#" @click.prevent="goBack" v-if="!formSent">
                    <p>Wróć do poprzedniego kroku</p>
                </a>
                <!-- krok 1 -->
                <div class="form__step form__step1 d-flex" ref="step1">
                    <div class="form__left col-sm-12 col-md-6">
                        <div class="form__left__step">
                            KROK 1/2
                        </div>
                        <div class="form__left__title">
                            <h2>Inspirujemy do aktywności, szczególnie tej miejskiej! Bądź aktywny wiosną!</h2>
                        </div>
                        <div class="form__left__text">
                            <p>Obdarujemy voucherem na spersonalizowanie roweru marki POLKA BIKES 7 osób, które w kreatywny sposób pokażą nam na zdjęciu czym jest dla nich codzienna aktywność fizyczna!</p>
                        </div>
                        <div class="form__left__fileinput">
                            <input type="file" name="file" id="file" v-on:change="changeFile">
                            <p>wybierz zdjęcie</p>
                            <label for="file"></label>
                            <p class="form__left__fileinput__info1">maksymalna waga pliku to 10mb</p>
                            <p class="form__left__fileinput__info2">lub przeciągnij je na pole po prawej</p>
                        </div>
                    </div>
                    <div class="form__right col-sm-12 col-md-6 d-none d-md-flex">
                        <div class="form__right__upload" ref="fileform" :style="{ backgroundImage: 'url(' + filePreview + ')' }">
                            <span class="form__right__upload__top">Przeciągnij zdjęcie w ten obszar</span>
                            <span class="form__right__upload__bottom">Maksymalna waga pliku to 10 MB</span>
                        </div>
                    </div>
                </div>
                <!-- btn z kroku 2 do 1 na duze ekrany -->
                <a class="form__next d-md-block" href="#" @click.prevent="goNext" v-if="!formSent">
                    <p>Przejdź dalej</p>
                </a>
                <!-- krok 2 -->
                <div class="form__step form__step2" ref="step2">
                    <div v-if="!formSent">
                        <div class="form__step2__back d-lg-none" @click.prevent="goBack" v-if="!formSent">
                            <p>Wróć do poprzedniego kroku</p>
                        </div>
                        <div class="form__step2__step">
                            KROK 2/2
                        </div>
                        <div class="form-row">
                            <div class="form-group form__step2__form-group col-sm-6 col-lg-4 col-xl-3">
                                <label for="name">Imię i nazwisko</label>
                                <input name="name" v-validate="'required'" type="text" class="form-control" placeholder="" v-model="name">
                                <p class="text-danger" v-if="errors.has('name')">{{ errors.first('name') }}</p>
                            </div>
                            <div class="form-group form__step2__form-group col-sm-6 col-lg-4 col-xl-3">
                                <label for="email">Adres e-mail</label>
                                <input name="email" v-validate="'required|email'" type="text" class="form-control" placeholder="" v-model="email">
                                <div class="input-line"><div></div></div>
                                <p class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</p>
                            </div>
                            <div class="form-group form__step2__form-group col-sm-6 col-lg-4 col-xl-3">
                                <label for="phone">Telefon kontaktowy</label>
                                <input name="phone" maxlength="9" v-validate="'required|digits:9'" type="tel" class="form-control" placeholder="" v-model="phone">
                                <p class="text-danger" v-if="errors.has('phone')">{{ errors.first('phone') }}</p>
                            </div>
                            <div class="form-group form__step2__form-group select col-sm-6 d-none d-sm-block d-lg-none">
                            <label for="info">Skąd dowiedziałeś się o konkursie?</label>
                                <select name="category" v-validate="'required|not_in:0'" v-model="category" class="form-control">
                                    <option selected value="0">Wybierz</option>
                                    <option value="z Facebooka">z Facebooka</option>
                                    <option value="od znajomego">od znajomego</option>
                                    <option value="w salonie --nazwa-firmy--">w salonie --nazwa-firmy--</option>
                                    <option value="Inne">Inne</option>
                                </select>
                                <i class="fa fa-caret-down"></i>
                                <p class="text-danger" v-if="errors.has('category')">{{ errors.first('category') }}</p>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group form__step2__form-group select d-sm-none d-lg-block col-lg-4 col-xl-3" >
                                <label for="info">Skąd dowiedziałeś się o konkursie?</label>
                                <select name="category" v-validate="'required|not_in:0'" v-model="category" class="form-control">
                                    <option selected value="0">Wybierz</option>
                                    <option value="z Facebooka">z Facebooka</option>
                                    <option value="od znajomego">od znajomego</option>
                                    <option value="w salonie --nazwa-firmy--">w salonie --nazwa-firmy--</option>
                                    <option value="Inne">Inne</option>
                                </select>
                                <i class="fa fa-caret-down"></i>
                                <p class="text-danger" v-if="errors.has('category')">{{ errors.first('category') }}</p>
                            </div>
                            <div class="form-group form__step2__form-group col-lg-8 col-xl-6">
                                <div class="checkboxes">
                                    <input @click="handleCheckbox('perm1')" ref="perm1" class="form-check-input" id="perm1" type="checkbox" name="perm1" value="1" v-model="perm1" >
                                    <label ref="perm1Label" class="form-check-label" for="perm1">
                                        Zapoznałem się z Regulaminem Konkursu i go akceptuję <span>*</span>
                                    </label>
                                    <p class="text-danger" v-if="errors.has('perm1')">{{ errors.first('perm1') }}</p>
                                    <input @click="handleCheckbox('perm2')" ref="perm2" class="form-check-input" id="perm2" type="checkbox" value="1" name="perm2" v-model="perm2" >
                                    <label ref="perm2Label" class="form-check-label" for="perm2">
                                        Dodatkowo wyrażam zgodę na otrzymywanie na podany przeze mnie adres e-mail korespondencji handlowej w postaci NEWSLETTERA na zasadach określonych w niniejszym <a href="https://--nazwa-firmy--.com/informacja-dla-subskrybentow,0,123.htm">Regulaminie</a> <span>*</span>
                                    </label>
                                    <!-- <p class="text-danger" v-if="errors.has('perm2')">{{ errors.first('perm2') }}</p>
                                    <input @click="handleCheckbox('perm3')" ref="perm3" class="form-check-input" id="perm3" type="checkbox" value="1" name="perm3" v-model="perm3" >
                                    <label ref="perm3Label" class="form-check-label" for="perm3">
                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<span>*</span>
                                    </label>
                                    <p class="text-danger" v-if="errors.has('perm3')">{{ errors.first('perm3') }}</p> -->
                                    <div class="clearfix"></div>
                                    <button ref="submit" type="submit" class="form__step2__form-group__button">wyślij swoje zgłoszenie</button>
                                </div>
                                <div class="sk-circle">
                                    <div class="sk-circle1 sk-child"></div>
                                    <div class="sk-circle2 sk-child"></div>
                                    <div class="sk-circle3 sk-child"></div>
                                    <div class="sk-circle4 sk-child"></div>
                                    <div class="sk-circle5 sk-child"></div>
                                    <div class="sk-circle6 sk-child"></div>
                                    <div class="sk-circle7 sk-child"></div>
                                    <div class="sk-circle8 sk-child"></div>
                                    <div class="sk-circle9 sk-child"></div>
                                    <div class="sk-circle10 sk-child"></div>
                                    <div class="sk-circle11 sk-child"></div>
                                    <div class="sk-circle12 sk-child"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="thanks" v-if="formSent">
                        <h2>Dziękujemy za wzięcie udziału w konkursie!</h2>
                    </div>
                </div>
            </form>
            
        </div>
        <div class="bad-file">
            <div class="bad-file__wrapper">
                <h2>to nie jest obrazek lub plik ma więcej niż 10MB</h2>
                <button>OK</button>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                formSent: false,
                filePreview: '',
                name: '',
                email: '',
                phone: '',
                file: '',
                category: 0,
                perm1: false,
                perm2: false
            }
        },
        methods: {
            
            handleCheckbox(elementId) {
                var item = document.getElementById(elementId);
                if (item.checked) {
                    this.$refs[item.id + 'Label'].style.color = "#D7C7FF";
                } else {
                    this.$refs[item.id + 'Label'].style.color = "red";
                }
            },
            handleSubmit() {
                this.$refs.submit.disabled = true;
                $('.sk-circle').css('opacity', '1');
                this.$validator.validateAll().then((result) => {
                    var checked = true;
                    ['perm1', 'perm2'].forEach(function(item) {
                        if (!this.$refs[item].checked) {
                            // this.$refs[item + 'Label'].style.color = "red";
                            this.handleCheckbox(item);
                            checked = false;
                        } else {
                            // this.$refs[item + 'Label'].style.color = "#D7C7FF";
                            this.handleCheckbox(item);
                        }
                    }.bind(this));
                    if (result && checked) {
                        let formData = new FormData(this.$refs.form);
                        formData.append('file', this.file);   
                        axios.post('/api/entries', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }}).then(res => {
                                // tutaj powinien wyświetlić się komunikat o wysłanym mailu (zamiast formularza)
                                // this.$refs.formContainer.classList.remove('form--step2');
                                this.formSent = true;
                                this.$refs.submit.disabled = false;
                            })
                            .catch(res => { console.error(res) })
                    } else {
                        this.$refs.submit.disabled = false;
                        $('.sk-circle').css('opacity', '0');
                        if (this.errors.length) {
                            document.querySelector('input[name="' + this.errors.items[0].field + '"], textarea[name="' + this.errors.items[0].field + '"]').scrollIntoView({
                                behavior: 'smooth'
                            });
                        }
                        this.resizeForm();
                    }
                });
            },
            changeFile(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length) {
                    return;
                }
                this.file = files[0];
                this.prepareFile();
            },
            prepareFile() {
                $('.form__right__upload__top').css('display', 'none');
                $('.form__right__upload__bottom').css('display', 'none');
                if (this.file.size > 10485760 || !/\.(jpe?g|png|gif)$/i.test( this.file.name )) {
                    $('.bad-file').fadeIn();
                    $('.bad-file').on('click', function(){
                        $(this).fadeOut();
                        $('.form__right__upload__top').css('display', 'block');
                        $('.form__right__upload__bottom').css('display', 'block');
                    });
                    // alert('to nie jest obrazek lub plik ma więcej niż 10MB');
                    //tutaj komunikat walidacyjny na obrazek (popup czy cuś)
                    this.file = false;
                    return;
                }
                let reader = new FileReader();
                reader.addEventListener("load", function(){
                    this.filePreview = reader.result;

                    // pokazujemy button do przejścia dalej
                    this.$refs.formContainer.classList.add('form--step2-ready');
                }.bind(this), false);
                reader.readAsDataURL( this.file );
            },
            goNext() {
                this.$refs.formContainer.classList.remove('form--step1');
                this.$refs.formContainer.classList.remove('form--step2-ready');
                this.$refs.formContainer.classList.add('form--step2');
                this.resizeForm();
            },
            goBack() {
                this.$refs.formContainer.classList.remove('form--step2');
                this.$refs.formContainer.classList.add('form--step2-ready');
                this.$refs.formContainer.classList.add('form--step1');
            },
            resizeForm() {
                var step2 = $('.form__step2');
                var leftForm = $('.form__left');
                var height = step2.height();
                console.log(height);
                console.log(leftForm.height());
                if ($('.form').hasClass('form--step2')) {
                    leftForm.height(height);
                } else {
                    
                }
            }
        },
        created() {
            this.$validator.localize('pl', {
                messages:{
                    required: () => 'To pole jest wymagane.',
                    email: () => 'Wprowadź poprawny adres email',
                    digits: () => 'Telefon musi mieć 9 cyfr.',
                    not_in: () => 'Zaznacz kategorię.'
                }
            });
            this.$validator.localize('pl');
        },
        mounted() {

            $(document).ready(function(){
                this.resizeForm();
                $(window).resize(function() {
                    this.resizeForm();
                }.bind(this));
            }.bind(this));

            // czytanie pliku
            ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( function( evt ) {
                this.$refs.fileform.addEventListener(evt, function(e){
                    e.preventDefault();
                    e.stopPropagation();
                }.bind(this), false);
            }.bind(this));
            this.$refs.fileform.addEventListener('drop', function(e){
                this.file = e.dataTransfer.files[0];
                this.prepareFile();
            }.bind(this));
        }
    }
</script>




