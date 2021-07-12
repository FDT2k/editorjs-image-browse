import { ToolConstructable, ToolSettings } from '@editorjs/editorjs';
import Paragraph from '@editorjs/paragraph'
import SimpleImage from 'editorjs-simple-image';

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
        config:{
            shouldMakeLinkAbsolute:true,
            browseCallback : function (callback){

                console.log('browse clicked');

                callback('logo512.png');
            }
        }
    }
};
