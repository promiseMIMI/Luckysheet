/*
 * @Author: lanseliuyia YCKJ_clj@163.com
 * @Date: 2022-06-20 18:20:54
 * @LastEditors: lanseliuyia YCKJ_clj@163.com
 * @LastEditTime: 2022-09-15 14:45:07
 * @FilePath: \Luckysheet-master\src\controllers\listener.js
 * @Description: 
 * 
 * Copyright (c) 2022 by lanseliuyia YCKJ_clj@163.com, All Rights Reserved. 
 */
/**
 * Monitor special variables
 */
import {createProxy} from '../utils/util';
import Store from '../store/index';
import method from '../global/method';
import { getluckysheetfile } from '../methods/get'
import { toJson } from '../global/api';

let undoTimer,redoTimer;
function undoAccessible(len) {
    clearTimeout(undoTimer);
    undoTimer = setTimeout(() => {
        $('#luckysheet-icon-undo')[len ? 'removeClass' : 'addClass']('disabled');
    }, 10);
}
function redoAccessible(len) {
    clearTimeout(redoTimer);
    redoTimer = setTimeout(() => {
        $('#luckysheet-icon-redo')[len ? 'removeClass' : 'addClass']('disabled');
    }, 10);
}

const initListener = function(){
    // createProxy(Store,['jfredo']);
    createProxy(Store, 'jfredo',(target, property, val, receiver)=>{
        if (property !== 'length') {
            //  钩子函数
            method.createHookFunction('updated',val)
        }
        undoAccessible(Store.jfredo.length);
    });
    createProxy(Store, 'jfundo',(target, property, val, receiver)=>{
        redoAccessible(Store.jfundo.length);
    });
    // Store.luckysheetfile[order]["frozen"]
    createProxy(Store, 'jffrozen',(target, property, val, receiver)=>{
      method.createHookFunction('updated', 'jffrozen')
    });

    createProxy(Store, 'asyncLoad', (target, property, val, receiver)=>{
        if(property === 'length' && val === 0){
            method.createHookFunction('workbookCreateAfter', toJson())
        }
    })
}

export {
    initListener
}