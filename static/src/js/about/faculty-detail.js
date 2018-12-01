/* eslint no-unused-vars: off */
import header from 'static/src/js/components/common/header/index.js';
import getFacultyDetail from 'static/src/js/components/about/faculty/get-faculty-detail.js';

const content = document.getElementById( 'content' );
const teacherName = document.getElementById( 'teacherName' );

getFacultyDetail( content, teacherName );

header( document.getElementById( 'header' ) );
