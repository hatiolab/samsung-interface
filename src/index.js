import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'url-polyfill'
import 'url-search-params-polyfill'
import { SceneIntegrator } from '@things-scene/things-board-integration'

export function init({ baseURL, queryString, authorizationKey, license = '' }) {
  var fit = 'both' // 'both', 'ratio', 'center', 'none'

  var searchParams

  if (!queryString) {
    return alert('Parameter가 존재하지 않습니다.')
  }

  searchParams = new URLSearchParams(queryString)

  var sceneName = searchParams.get('scene')

  if (!sceneName) {
    return alert('Scene name이 필요합니다.')
  }

  authorizationKey = authorizationKey;

  var integrator = SceneIntegrator.instance({
    authorizationKey,
    withCredentials: true,
    baseURL,
    fit,
    license
  })

  integrator.integrate({
    target: 'scene-viewer',
    sceneName: sceneName,
    callback: board => {
      window.board = board

      board.root.invalidate()
    }
  })
}
