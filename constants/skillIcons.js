import {
    siAndroid,
    siBootstrap,
    siC,
    siCelery,
    siCplusplus,
    siCss,
    siDjango,
    siDocker,
    siFastapi,
    siFirebase,
    siFlask,
    siGit,
    siHtml5,
    siJavascript,
    siJetpackcompose,
    siKotlin,
    siKubernetes,
    siLinux,
    siMaterialdesign,
    siMongodb,
    siMysql,
    siNextdotjs,
    siNodedotjs,
    siNumpy,
    siNvidia,
    siOpenjdk,
    siPandas,
    siPostgresql,
    siPython,
    siReact,
    siRedis,
    siScikitlearn,
    siSqlalchemy,
    siSqlite,
    siSupabase,
    siTypescript,
} from "simple-icons";

// Keyed to match the "icon" slugs already used in public/data/skills.json.
// Playwright has no simple-icons entry (never added upstream), so it's
// intentionally absent here — resolveIcon() falls back to the dot placeholder.
const SKILL_ICONS = {
    android: siAndroid.path,
    bootstrap: siBootstrap.path,
    c: siC.path,
    celery: siCelery.path,
    cplusplus: siCplusplus.path,
    css3: siCss.path,
    django: siDjango.path,
    docker: siDocker.path,
    fastapi: siFastapi.path,
    firebase: siFirebase.path,
    flask: siFlask.path,
    git: siGit.path,
    html5: siHtml5.path,
    javascript: siJavascript.path,
    jetpackcompose: siJetpackcompose.path,
    kotlin: siKotlin.path,
    kubernetes: siKubernetes.path,
    linux: siLinux.path,
    materialdesign: siMaterialdesign.path,
    mongodb: siMongodb.path,
    mysql: siMysql.path,
    nextdotjs: siNextdotjs.path,
    nodedotjs: siNodedotjs.path,
    numpy: siNumpy.path,
    nvidia: siNvidia.path,
    openjdk: siOpenjdk.path,
    pandas: siPandas.path,
    postgresql: siPostgresql.path,
    python: siPython.path,
    react: siReact.path,
    redis: siRedis.path,
    scikitlearn: siScikitlearn.path,
    sqlalchemy: siSqlalchemy.path,
    sqlite: siSqlite.path,
    supabase: siSupabase.path,
    typescript: siTypescript.path,
};

// Resolves a skill's optional "icon" field into a renderable form:
// - a key in SKILL_ICONS -> inline tinted SVG (crisp, recolorable, no rebuild needed to reorder/reuse)
// - an http(s) URL -> <img> tag (lets new logos be added via JSON only, no rebuild)
// - anything else / absent -> a plain accent dot (used for architecture & pattern skills)
export function resolveIcon(icon) {
    if (!icon) return { type: "dot" };
    if (/^https?:\/\//.test(icon)) return { type: "img", value: icon };
    if (SKILL_ICONS[icon]) return { type: "svg", value: SKILL_ICONS[icon] };
    return { type: "dot" };
}
