import { format } from 'date-fns';
import Vue from 'vue';

Vue.filter('renderDate', (v: number): string => {
    const time = String(v).length < 11 ? v * 1000 : v;
    return format(time, 'yyyy-MM-dd');
});
