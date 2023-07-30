import { HookContext } from '@feathersjs/feathers'
// import { merge } from 'lodash'

// import { Model } from 'sequelize'

export default function (options: any = {}) {
  // eslint-disable-next-line no-param-reassign
  options.models = options.models || []

  return async (context: HookContext) => {
    const sequelize = context.params.sequelize || {}
    const include = sequelize.include || []
    const { models } = context.app.get('sequelizeClient')

    sequelize.include = include.concat(
      options.models.map((model: any) => {
        const newModel = { ...model }
        const currentModel = models[model.model]

        if (!currentModel) throw new Error(`Service ${model.model} not found`)

        newModel.model = currentModel
        return newModel
      })
    )

    //	Nested output
    sequelize.raw = false

    context.params.sequelize = sequelize
    return context
  }
}

// type Assoc = {
//   association?: any
//   attributes?: any[]
//   include?: any[]
//   model?: any
//   as?: any
// }

// type Include = {
//   model?: any
//   as?: any
//   attributes?: any[]
//   include?: Include[]
// }
// type AssocOptions = {
//   include?: any[]
// }

// const associateModels = (include: Include | Include[], context: HookContext) => {
//   const associations: Assoc[] = []

//   ;(Array.isArray(include) ? include : [include]).forEach((assoc: any) => {
//     const { as: associate, model, include: subInclude, ...rest } = assoc

//     if (associate in context.app.service(model).Model.associations) {
//       const association: Assoc = {
//         association: context.app.service(assoc.model).Model.associations[associate],
//         ...rest
//       }
//       if (subInclude) association.include = associateModels(subInclude, context)

//       associations.push(association)
//     } else {
//       throw new Error(
//         `Requested association '${assoc.as}' of model ${
//           context.app.service(model).Model.name
//         } doesn't exist. Available associations are: ${context.app.service(model).Model.associations}`
//       )
//     }
//   })
//   return associations
// }

// export default (options: AssocOptions): any =>
//   async (context: HookContext) => {
//     console.log('AddAssoc.hook.ts: ', options)
//     if (!options.include) throw new Error(`Include is not defined`)

//     try {
//       const include: any = associateModels(options.include, context)

//       if (include) {
//         context.params.sequelize = merge(context.params.sequelize, {
//           include,
//           raw: false
//         })
//         console.log(context.params.sequelize)
//       }
//       return context
//     } catch (err: any) {
//       throw new Error(err)
//     }
//   }
