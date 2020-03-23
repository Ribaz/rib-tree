
    //Create the Tree in a page
    function CreateTree(htmlElement, source) {
        var _html = "";

        if (Object.keys(source).length == 0) {
            alert("Error in tree source."); //Error
        } else {
            var _rootIndex = Object.keys(source)[0];
            var _rootElem = source[_rootIndex];

            //Generally, this for cycle iterate only one time...
            for (var i = 0; i < _rootElem.length; i++) {
                //Getting current root's HTML code
                if (_rootElem[i].type == "leaf") {
                    _html += GetLeafHTML(_rootElem[i]);
                } else if (_rootElem[i].type == "folder") {
                    _html += GetFolderHTML(_rootElem[i], source);
                } else {
                    alert("Error in tree element type."); //Error
                }
            }
        }

        $(htmlElement).html(_html);
    }
    //Get folder content from the source
    function GetFolderContent(id, source) {
        for (var i = 0; i < Object.keys(source).length; i++) {
            if (Object.keys(source)[i] == id) {
                return Object.keys(source)[i];
            }
        }
    }
    //Get Leaf's HTML code
    function GetLeafHTML(leaf) {
        var _html = '<div class="rib-tree-branch-element leaf"> ' + leaf.label + '</div>';
        return _html;
    }
    //Get Folder's HTML code
    function GetFolderHTML(folder, source) {
        var _sonsHMTL = '';
        var _currSons = GetFolderContent(folder.id, source);

        if (source[_currSons].length == 0) {
            alert("Error in tree folder! Unable to find sons."); //Error
        } else {
            for (var i = 0; i < source[_currSons].length; i++) {
                if (source[_currSons][i].type == 'leaf') {
                    // Append leaf's HTML code...
                    _sonsHMTL += GetLeafHTML(source[_currSons][i]);
                } else if (source[_currSons][i].type == 'folder') {
                    // Append folder's HTML code...
                    _sonsHMTL += GetFolderHTML(source[_currSons][i], source);
                } else {
                    alert("Error in tree element type."); //Error
                }
            }
        }
        
        var _html = '<div class="rib-tree-branch">' +
                        '<div class="rib-tree-branch-element collapsed" data-toggle="collapse" href="#' + folder.strId + '"> ' +
                            folder.label +
                        '</div>' + 
                        '<div class="rib-tree-branch-content collapse" id="' + folder.strId + '">' +
                            _sonsHMTL + 
                        '</div>' + 
                    '</div>';
        return _html;
    }