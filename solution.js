function solvePuzzle(pieces) {
  let puzzles = pieces
  let outerArray = []
  let prevEl = {}
  let topEl = {}
  while (outerArray.length < 100) {
    if (outerArray.length>=10) {
      topEl = outerArray[outerArray.length-10]
    }
    let leftTypeForFind = ''
    let topTypeForFind = ''
    if (!!prevEl.edges && !!prevEl.edges.right) {
      if (prevEl.edges.right.type === 'outside') { leftTypeForFind = 'inside' } else { leftTypeForFind = 'outside' }
    }
    if (!!topEl.edges && !!topEl.edges.bottom) {
      if (topEl.edges.bottom.type === 'outside') { topTypeForFind = 'inside' } else { topTypeForFind = 'outside' }
    }
    //условие для 1-го элемента
    if (!outerArray.length) {
      prevEl = puzzles[0]
      while (!!prevEl.edges.left || !!prevEl.edges.top) {
        prevEl = rotatePuzzle(prevEl)
      }
      outerArray.push(prevEl)
    } else {  //для всего остального
      //если строка не заполнена и текущий элемент не будет первым в строке
      if (!!(outerArray.length%10)) {
        let currentEl = puzzles.find(el=> {
          let top, right, bottom, left
          if (!!el.edges.top) top = (el.edges.top.edgeTypeId === prevEl.edges.right.edgeTypeId)
              &&(el.edges.top.type===leftTypeForFind)
          if (!!el.edges.right) right =
              (el.edges.right.edgeTypeId === prevEl.edges.right.edgeTypeId)
              &&(el.edges.right.type===leftTypeForFind)
          if (!!el.edges.bottom) bottom = (el.edges.bottom.edgeTypeId === prevEl.edges.right.edgeTypeId)
              &&(el.edges.bottom.type===leftTypeForFind)
          if (!!el.edges.left) left =
              (el.edges.left.edgeTypeId === prevEl.edges.right.edgeTypeId)
              &&(el.edges.left.type===leftTypeForFind)
          return top || right || bottom || left
        })
        while ((currentEl.edges.left?.edgeTypeId !== prevEl.edges.right?.edgeTypeId) ) {
          currentEl = rotatePuzzle(currentEl)
        }
        prevEl = currentEl
        outerArray.push(currentEl)
      } else {
        //первые элементы в строке
        let currentEl = puzzles.find(el=> {
          let top, right, bottom, left
          if (!!el.edges.top) top = (el.edges.top.edgeTypeId === topEl.edges.bottom.edgeTypeId)
              &&(el.edges.top.type===topTypeForFind)
          if (!!el.edges.right) right =
              (el.edges.right.edgeTypeId === topEl.edges.bottom.edgeTypeId)
              &&(el.edges.right.type===topTypeForFind)
          if (!!el.edges.bottom) bottom = (el.edges.bottom.edgeTypeId === topEl.edges.bottom.edgeTypeId)
              &&(el.edges.bottom.type===topTypeForFind)
          if (!!el.edges.left) left =
              (el.edges.left.edgeTypeId === topEl.edges.bottom.edgeTypeId)
              &&(el.edges.left.type===topTypeForFind)
          return top || right || bottom || left
        })
        while ((currentEl.edges.top?.edgeTypeId !== topEl.edges.bottom?.edgeTypeId) ) {
          currentEl = rotatePuzzle(currentEl)
        }
        prevEl = currentEl
        outerArray.push(currentEl)
      }
    }
  }
  return outerArray.map(el=>el.id)
}

function rotatePuzzle (puzzle) {
  const {edges: {top, right, bottom, left}} = puzzle
  puzzle.edges = {top: left, right: top, bottom: right, left: bottom}
  return puzzle
}

// Не удаляйте эту строку
window.solvePuzzle = solvePuzzle

