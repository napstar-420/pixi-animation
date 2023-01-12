const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
});

document.body.appendChild(app.view);

let player = null;

PIXI.Assets.add("backSprite", "./assets/background.jpg");
PIXI.Assets.add("json", "./spritesheet.json");

const texturePromise = PIXI.Assets.load(["backSprite", "player"]);
texturePromise.then((textures) => {
  // BACKGROUND TILING EFFECT
  const backHeight = textures.backSprite.height
  const tilingSprite = new PIXI.TilingSprite(
    textures.backSprite,
    app.renderer.width,
    window.innerHeight
  );
  app.stage.addChild(tilingSprite);
  app.ticker.add((delta) => {
    tilingSprite.tilePosition.x -= delta * 2;
  });
  // GENERATE SPRITE RUNNING ANIMATION
  generateSpriteAnimation(backHeight);
});

async function generateSpriteAnimation(height) {
  const spritesheet = new PIXI.Spritesheet(
    PIXI.BaseTexture.from(atlasData.meta.image),
    atlasData
  );
  await spritesheet.parse();
  const texturesArray = [];
  Object.keys(spritesheet.textures).map((key) => {
    texturesArray.push(spritesheet.textures[key]);
  });
  const anim = new PIXI.AnimatedSprite(texturesArray);
  anim.animationSpeed = 0.1666;
  anim.x = window.innerWidth / 2;
  anim.y = window.innerWidth < 500 ? 550 : window.innerWidth < 1000 ? 450 : 400;
  anim.width = window.innerWidth < 500 ? 250 : window.innerWidth < 1000 ? 400 : 600
  anim.height = anim.width - 150;
  anim.anchor.x = 0.5;
  anim.anchor.y = 0.5;
  anim.play();
  app.stage.addChild(anim);
}