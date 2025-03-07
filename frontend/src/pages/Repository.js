import React, { useEffect } from 'react';
import Marzipano from 'marzipano';

const MarzipanoViewer = () => {
  useEffect(() => {
    console.log('Initializing Marzipano viewer...');

    const panoElement = document.getElementById('pano');
    const viewerOpts = {
      controls: {
        mouseViewMode: 'drag'
      }
    };

    const viewer = new Marzipano.Viewer(panoElement, viewerOpts);

    const levels = [
      { tileSize: 512, size: 512 },
      { tileSize: 512, size: 1024 }
    ];

    const source = Marzipano.ImageUrlSource.fromString('img/b3.jpeg');
    const geometry = new Marzipano.EquirectGeometry(levels);
    const limiter = Marzipano.RectilinearView.limit.traditional(1024, 100 * Math.PI / 180);
    const view = new Marzipano.RectilinearView({}, limiter);

    const scene = viewer.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: true,
    });

    scene.switchTo({
      transitionDuration: 1000
    });
    
    var destinationViewParameters = {
      yaw: 10 * Math.PI/180,
      pitch: 15 * Math.PI/180,
      fov: 60 * Math.PI/180
    };
    
    var options = {
      transitionDuration: 2000
    }
    
    scene.lookTo(destinationViewParameters, options);

    var autorotate = Marzipano.autorotate({
      yawSpeed: 0.1,         // Yaw rotation speed
      targetPitch: 0,        // Pitch value to converge to
      targetFov: Math.PI/2   // Fov value to converge to
    });
    
    // Autorotate will start after 3s of idle time
    viewer.setIdleMovement(1000, autorotate);  
    // Disable idle movement
    // viewer.setIdleMovement(Infinity);
    
    // Start autorotation immediately
    viewer.startMovement(autorotate); 
    // Stop any ongoing automatic movement
    viewer.stopMovement();
  }, []);

  return <div id="pano" style={{ width: '100%', height: '500px', background: '#ffcccc4d' }}></div>;
};

export default MarzipanoViewer;
