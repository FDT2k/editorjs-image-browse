/**
 * Build styles
 */
require('./index.css').toString();

/**
 * SimpleImage Tool for the Editor.js
 * Works only with pasted image URLs and requires no server-side uploader.
 *
 * @typedef {object} SimpleImageData
 * @description Tool's input and output data format
 * @property {string} url — image URL
 * @property {string} caption — image caption
 * @property {boolean} withBorder - should image be rendered with border
 * @property {boolean} withBackground - should image be rendered with background
 * @property {boolean} stretched - should image be stretched to full width of container
 */
class SimpleImage {
    static get toolbox() {
      return {
        title: 'Image',
        icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
      };
    }



    constructor({ data, config, api, readOnly }) {
        this.config = config;
        this.data =data;
        this.nodes = {
             input: null,
             preview: null,
             editor: null,
             wrapper:null,
             button:null,
        }
    }

    _createImage(url){
        const image = document.createElement('img');

        image.src = url;
        console.log(image);
      }


    render(){

        this.nodes.editor = document.createElement('div');
        this.nodes.editor.classList.add('editor');
        this.nodes.button = document.createElement('button');
        this.nodes.input = document.createElement('input');
        this.nodes.input.classList.add('input-url');
        this.nodes.input.type="hidden";
        this.nodes.preview = document.createElement('img');
        this.nodes.preview.classList.add('picture-preview');
        console.log('loading',this.data);

        this.nodes.input.value =  this.data && this.data.url ? this.data.url : '';
        this.nodes.preview.src = this.nodes.input.value ;

        this.nodes.input.addEventListener('paste', (event) => {
             this._createImage(event.clipboardData.getData('text'));
           });

        this.nodes.wrapper = document.createElement('wrapper')
        this.nodes.wrapper.appendChild(this.nodes.input);
        this.nodes.wrapper.appendChild(this.nodes.button);

        this.nodes.button.type = 'button';
        this.nodes.button.innerHTML ='Browse';



        this.nodes.editor.appendChild(this.nodes.wrapper);
        this.nodes.editor.appendChild(this.nodes.preview);

        if(this.config.browseCallback){

            this.nodes.button.addEventListener('click', (event) => {
                this.config.browseCallback( file=>{

                    this.nodes.input.value = this.prepareLink(file);
                    this.nodes.preview.src = this.nodes.input.value ;
                    console.log(file);
                },this);
            });
        }
       return this.nodes.editor;
     }

     save(blockContent){
         return {
             url: this.prepareLink(this.nodes.input.value)
         }
     }
     prepareLink(link) {
         link = link.trim();
         link = this.makeAbsolute(link);
         link = this.addProtocol(link);
         return link;
     }

     makeAbsolute(link) {
         const isAbsolute = /^\/[^/\s]?/.test(link);
         const isProtocolRelative = /^\/\/[^/\s]/.test(link);
         const isProtocolAbsolute = /^(\w+):\/\/[^/\s]/.test(link);
         const isAnchor = link.substring(0, 1) === '#';
         if(this.config.shouldMakeLinkAbsolute && !isProtocolRelative && !isAbsolute && !isAnchor && !isProtocolAbsolute){
             return `/${link}`;

         }
         return link;
     }

     addProtocol(link) {
         if (/^(\w+):(\/\/)?/.test(link)) {
             return link;
         }

         const isInternal = /^\/[^/\s]?/.test(link),
         isAnchor = link.substring(0, 1) === '#',
         isProtocolRelative = /^\/\/[^/\s]/.test(link);

         if (this.config.shouldAppendProtocol && !isInternal && !isAnchor && !isProtocolRelative) {
             link = 'http://' + link;
         }

         return link;
     }
}

module.exports = SimpleImage;
