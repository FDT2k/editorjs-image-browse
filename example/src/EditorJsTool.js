import { ToolConstructable, ToolSettings } from '@editorjs/editorjs';
import Paragraph from '@editorjs/paragraph'
import SimpleImage from 'editorjs-image-browse';
import Hyperlink from 'editorjs-hyperlink-browse';

export const EDITOR_JS_TOOLS = {
    paragraph: {
        class: Paragraph,
        config: {
            preserveBlank: true
        },
        inlineToolbar: true

    },

    image: {
        class:SimpleImage,
        inlineToolbar: true,
        config:{
            previewClass:'hello-preview',
            shouldMakeLinkAbsolute:true,
            browseCallback : function (callback){

                console.log('browse clicked');

                callback('logo512.png');
            }
        }
    },
    hyperlink: {
        class: Hyperlink,
        config: {
            shortcut: 'CMD+L',
            target: '_blank', // default null
            rel: 'nofollow', // default null
            availableTargets: [ '_self',{'frame':'Cadre','_blank':'Nouvelle Fenêtre'}],
            availableRels: [],
            validate: false,
            shouldAppendProtocol:false,
            shouldMakeLinkAbsolute: true,
          
            browseCallback : function (callback){

                console.log('browse clicked');

                callback('file.txt');
            }
        },
    },
};
