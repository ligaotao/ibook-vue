<script>
    import {
        ref, onMounted
    } from 'vue'

    import {bookClassify} from '@/api'

    export default {
        setup() {
            const classify = ref([])
            const getBookClassify = async function () {
                let result = await bookClassify()
                classify.value = result.data.result
            }
            onMounted(getBookClassify)
            return () => ( 
                <ul class="classfiy-list"> 
                    {classify.value.map(k => {
                        const slots = {
                            default: (slotScope) => <li onClick={slotScope.navigate}><i></i><span>{k.name}</span></li>
                        }
                        const url = {
                            path: '/classify_book',
                            query: {
                                url: k.url,
                                classfiy_name: k.name
                            }
                        }
                        return <router-link to={url} v-slots={slots} custom></router-link>
                    })}
                </ul>
            );
        }
    }
</script>

<style>
.classfiy-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    padding: 0 10px;
}
.classfiy-list li {
    display: flex;
    margin: 10px 0;
    width: 100%;
    text-align: left;
    padding-left: 20px;
    /* background: #eee; */
    border: 1px solid #ccc;
    line-height: 50px;
    align-items: center;
}
.classfiy-list li span {
    flex: 1;
    margin-left: 10px;
}
.classfiy-list i {
    width: 4px;
    height: 20px;
    background: #ccc;
}
</style>