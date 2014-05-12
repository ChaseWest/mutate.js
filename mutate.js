;(function(window, document, undefined){

    var target = document.querySelector("html");

    // create an observer instance
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
          _log(mutation);
      });
    });

    // configuration of the observer:
    var config = {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true
    };

    // pass in the target node, as well as the observer options
    observer.observe(target, config);

    function _log(mutation){
        var type = mutation.type,
            target = mutation.target,
            message = {
                "mutation": mutation,
                "type": type,
                "target": target
            };

        switch(type){
            case "attributes":

                message.changed = mutation.attributeName;
                message.from = mutation.oldValue;
                message.to = mutation.target.getAttribute(mutation.attributeName);
                break;

            case "childList":

                message.added = mutation.addedNodes;
                message.removed = mutation.removedNodes;
                break;

            case "characterData":

                message.changed = target.parentNode;
                message.from = mutation.oldValue;
                message.to = target.data;
                break;

            default:
                message = mutation;
        }

        if(!!console && !!console.log){
            console.log(message);
        }
    }

})(window, document);
