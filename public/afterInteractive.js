function three() {
    const body = document.getElementsByTagName('body')[0];

    function findStylesOfElement(element) {
        if (element.nodeType === 1) {
            let styles = window.getComputedStyle(element, null);
            let rect = element.getBoundingClientRect();

            let ews = { width: 0, height: 0, x: 0, y: 0, children: [] };
            ews.width = styles['width'];
            ews.height = styles['height'];
            ews.x = rect['left'];
            ews.y = rect['top'];

            if (element.childNodes && element.childNodes.length > 0) {
                element.childNodes.forEach((childNode) => {
                    let childWithStyles = findStylesOfElement(childNode);
                    if (childWithStyles) {
                        ews.children.push(childWithStyles);
                    }
                });
            }
            return ews;
        }
        return null;
    }

    bodyWithStyles = findStylesOfElement(body);

    let canvas = document.getElementById('renderCanvas');
    let engine = new BABYLON.Engine(canvas, true);
    let scene = null;

    engine.runRenderLoop(function () {
        if (scene) {
            scene.render();
        }
    });

    // Resize
    window.addEventListener('resize', function () {
        engine.resize();
    });

    let createScene = function (content) {
        let scene = new BABYLON.Scene(engine);

        let camera = new BABYLON.ArcRotateCamera(
            'Camera',
            Math.PI / 2,
            Math.PI / 3,
            1000,
            BABYLON.Vector3(0, 0, 0)
        );
        camera.attachControl(canvas, true, false);
        camera.lowerBetaLimit = 0.1;
        camera.upperBetaLimit = (Math.PI / 2) * 0.99;
        camera.lowerRadiusLimit = 100;
        camera.upperRadiusLimit = 5000;
        camera.panningSensibility = 10;
        camera.wheelPrecision = 1.1;

        let boxH = 15;
        let bodyWidth = 0;
        let bodyHeight = 0;

        let addActions = function (mesh) {
            mesh.actionManager = new BABYLON.ActionManager(scene);
            mesh.actionManager.registerAction(
                new BABYLON.SetValueAction(
                    BABYLON.ActionManager.OnPointerOutTrigger,
                    mesh.material,
                    'emissiveColor',
                    mesh.material.emissiveColor
                )
            );
            mesh.actionManager.registerAction(
                new BABYLON.SetValueAction(
                    BABYLON.ActionManager.OnPointerOverTrigger,
                    mesh.material,
                    'emissiveColor',
                    BABYLON.Color3.Purple()
                )
            );
        };

        let createBoxForDepth = function (element, depthLevel = 0) {
            let width = parseInt(element.width.replace('px', '')) || 1;
            let height = parseInt(element.height.replace('px', '')) || 1;

            if (bodyWidth === 0 && bodyHeight === 0) {
                bodyWidth = width;
                bodyHeight = height;
            }

            let x = bodyWidth / 2 + (-(width / 2) - element.x);
            let y = -bodyHeight / 2 + (height / 2 + element.y);
            let rgb = [255, 200 - 10 * depthLevel, 100 - 20 * depthLevel];

            let boxMaterial = new BABYLON.StandardMaterial(
                'ground',
                scene,
                true
            );
            boxMaterial.emissiveColor = BABYLON.Color3.FromInts(
                rgb[0],
                rgb[1],
                rgb[2]
            );
            boxMaterial.alpha = 0.4;

            let id = element.name;
            let box = BABYLON.MeshBuilder.CreateBox(
                id,
                { height: boxH, width: width, depth: height },
                scene,
                true
            );
            box.material = boxMaterial;
            box.position.x = x;
            box.position.z = y;
            box.position.y = (boxH + 3) * depthLevel;

            addActions(box);

            if (element.children && element.children.length > 0) {
                let nd = depthLevel + 1;
                element.children.forEach(function (ch) {
                    createBoxForDepth(ch, nd);
                });
            }
        };

        // Boxes
        createBoxForDepth(content, 0);

        return scene;
    };

    scene = createScene(bodyWithStyles);
}

setTimeout(three, 1000);
