## Get Started -- Try on CodePen

<!-- show demo here -->

-----------------------------------------------------------------------------------------
        Supports: Drag & Drop, File Upload 
-----------------------------------------------------------------------------------------

### Installation
-----------------------------------------------------------------------------------------

#### Vue3

Install via NPM

``` bash
    npm install file-upload-modal --save-dev
```

or with YARN

``` bash
    yarn add file-upload-modal
```

Load into app
``` js
const VueUploadComponent = require('file-upload-component')
Vue.component('file-upload', VueUploadComponent)

// or 
import VueUploadComponent from 'file-upload-component'
app.component('file-upload', VueUploadComponent);
```

### Typescript
``` js
import VueUploadComponent from 'file-upload-component/src/App.vue'

// or
import VueUploadComponent from 'file-upload-component'
// file-upload-component/dist/file-upload-component.d.ts

app.component('file-upload', VueUploadComponent)
```

### Usage
-----------------------------------------------------------------------------------------
(Vue 3 Options API)

<template>
  ---
  <file-upload-modal
        v-model:show="isModalShow" 
        v-model:files="files"
        buttonTag="button"
        buttonClass="btn btn--text sm"
        :maxUploadSize="4000 * 1000",
        :styles="{}"
        persist="true"
        align="'center'"
        disabled="false"
        :modalContentClasses=""
        files="null"
        show="false"
        draggable="true"
        @open="openModal"
    >
        Upload file
    </file-upload-modal>
    ---
</template>

<script lang="ts">
  import FileUploadModal from 'file-upload-modal';

  export default {
    name: "App",
    data() {
        return {
            files: [],
            isModalShow: false
        }
    },
    methods: {
        openModal() {
            this.isModalShow = true
        },
    }
  };
</script>

## Props

All props are optional, with the exception of the files and show props

|  Prop | Default value/Type | Description  |
|---|---|---|
| show  | false (boolean)  | Two-way data binding to control the visibility of the upload modal  |
| files | null (array or null)  | Two-way data binding value for holding the value of the uploaded files  |
| maxUploadSize | 5MB (number)  | Maximum byte to upload (5MB)  |
| mimeTypes  | "application/pdf" (string)  | takes in one or more MIME types  |
| isMulti | false (boolean)  | determines if multiple files can be selected or not  |
| draggable  | false (boolean)  | determines if drag & drop is present or not  |
| buttonClass | "btn btn--text sm" (string) | class styles for the modal trigger  |
| buttonTag | "button" (string)  | determines the kind of HTML tag to render for the modal trigger  |
| disabled | false (boolean)  | used to disable the upload component  |
|   |   |   |
|   |   |   |
|   |   |   |
|   |   |   |


## API

### Two-way data binding with v-model
File List

* **Type:** `Array<File | Object>`

* **Default:** `[]`

* **Details:**

  View **[`File`](#file)** details
  > In order to prevent unpredictable errors, can not directly modify the `files`, please use [`add`](#instance-methods-add), [`update`](#instance-methods-update), [`remove`](#instance-methods-remove) method to modify

* **Usage:**
  ```html
  <file-upload :value="files" @input="updatetValue"></file-upload>
  <!--or-->
  <file-upload v-model="files"></file-upload>
  ```

### features

Used to determine the browser support features

* **Type:** `Object`

* **Read only:** `true`

* **Default:** `{ html5: true, directory: false, drop: false }`

* **Usage:**
  ```html
  <app>
    <file-upload ref="upload"></file-upload>
    <span v-show="$refs.upload && $refs.upload.features.drop">Support drag and drop upload</span>
    <span v-show="$refs.upload && $refs.upload.features.directory">Support folder upload</span>
    <span v-show="$refs.upload && $refs.upload.features.html5">Support for HTML5</span>
  </app>
  ```

* **Result:** `Object | Array<File | Object> | Boolean`     The incoming array is returned to the array otherwise the object or `false`

* **Usage:**
  ```html
  <template>
    <ul>
      <li v-for="file in files">
        <span>{{file.name}}</span>
      </li>
    </ul>
    <file-upload v-model="files"></file-upload>
    <button type="button" @click.prevent="addText">Add a file</button>
  </template>
  <script>
  export default {
    data() {
      return {
        files: []
      }
    },
    methods: {
      addText() {
        let file = new window.File(['foo'], 'foo.txt', {
          type: "text/plain",
        })
        this.$refs.upload.add(file)
      }
    }
  }
  </script>
  ```

Empty the file list

* **Result:**  `Boolean`  Always return `true`


### id

File ID

* **Type:** `String | Number`

* **Read only:** `false`

* **Default:** `Math.random().toString(36).substr(2)`

* **Details:**

  >`id` can not be repeated
  >Upload can not modify `id`


### size

File size

* **Type:** `Number`

* **Read only:** `false`

* **Default:** `-1`

* **Browser:** `> IE9`


### name

Filename

* **Type:** `String`

* **Read only:** `false`

* **Default:** ` `

* **Details:**

  Format:  `directory/filename.gif`  `filename.gif`



### type

MIME type

* **Type:** `String`

* **Read only:** `false`

* **Default:** ` `

* **Browser:** `> IE9`

* **Details:**

  Format:  `image/gif`   `image/png`  `text/html`




### active

Activation or abort upload

* **Type:** `Boolean`

* **Read only:** `false`

* **Default:** `false`

* **Details:**

  `true` = Upload
  `false` = Abort






### error

Upload failed error code

* **Type:** `String`

* **Read only:** `false`

* **Default:** ` `

* **Details:**

  Built-in
  `size`, `extension`, `timeout`, `abort`, `network`, `server`, `denied`




### success

Whether the upload was successful

* **Type:** `Boolean`

* **Read only:** `false`

* **Default:** `false`


### putAction

Customize the current file `PUT` URL

* **Type:** `String`

* **Read only:** `false`

* **Default:** `this.putAction`



### postAction

Customize the current file `POST` URL

* **Type:** `String`

* **Read only:** `false`

* **Default:** `this.postAction`




### headers

Customize the current file `HTTP` Header

* **Type:** `Object`

* **Read only:** `false`

* **Default:** `this.headers`


### data

Customize the current file `body` or` query` to attach content

* **Type:** `Object`

* **Read only:** `false`

* **Default:** `this.data`


### timeout

Customize the upload timeout for a current single file

* **Type:** `Number`

* **Read only:** `false`

* **Default:** `this.timeout`


### response

Response data

* **Type:** `Object | String`

* **Read only:** `false`

* **Default:** `{}`




### progress

Upload progress

* **Type:** `String`

* **Read only:** `false`

* **Default:** `0.00`

* **Browser:** `> IE9`



### speed

Per second upload speed

* **Type:** `Number`

* **Read only:** `true`

* **Default:** `0`

* **Browser:** `> IE9`




### xhr

`HTML5` upload` XMLHttpRequest` object

* **Type:** `XMLHttpRequest`

* **Read only:** `true`

* **Default:** `undefined`

* **Browser:** `> IE9`




### iframe

`HTML4` upload` iframe` element

* **Type:** `Element`

* **Read only:** `true`

* **Default:** `undefined`

* **Browser:** `= IE9`