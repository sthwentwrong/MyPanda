
const { remote } = require('electron');
const { Menu, BrowserWindow, MenuItem, shell } = remote;

var abar = require('address_bar');
var folder_view = require('folder_view');

var folder = new folder_view.Folder($('#files'));
var addressbar = new abar.AddressBar($('#addressbar'));

folder.open(process.cwd());
addressbar.set(process.cwd());