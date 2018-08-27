// import React from 'react';
// import { Text, View } from 'react-native';
// import * as C from './common';
// import { Redirect } from 'react-router-dom';
// // import AccountQuery from '../queries/AccountQuery.graphql';
// // import * as G from '../queries/ro.typings';

// import { Formik, Form, Field } from 'formik';
// import Yup from 'yup';

// import { Button } from './Button';

// import { profileValidationSchemaFull } from '../shared/profileValidations';

// // @C.compose(
// //   C.graphql(UpdateProfileMutation, {
// //     name: 'updateProfileMutation',
// //   })
// // )
// @C.inject('store')
// @C.observer
// export class EditProfileForm extends React.Component<any> {
//   // static fragments = {
//   //   AccountFormComponent_account: gql`
//   //     fragment AccountFormComponent_account on User {
//   //       id
//   //       name
//   //       about
//   //       image_id
//   //       url
//   //       zip
//   //     }
//   //   `,
//   // };

//   save = async (values, actions) => {
//     try {
//       const res = await this.props.updateProfileMutation({
//         variables: {
//           input: values,
//         },
//       });
//       this.props.onComplete();
//     } catch (err) {
//       alert(`Something went wrong.  Please check your entries and try again.`);
//       actions.setSubmitting(false);
//     }
//   };

//   render() {
//     const { account } = this.props;
//     return (
//       <Formik
//         validationSchema={profileValidationSchemaFull}
//         initialValues={{
//           image_id: account.image_id || '',
//           name: account.name || '',
//           about: account.about || '',
//           url: account.url || '',
//           zip: account.zip || '',
//         }}
//         onSubmit={this.save}
//         render={({ values, touched, errors, dirty, isSubmitting, handleSubmit }) => (
//           <Form>
//             <Field
//               name="image_id"
//               label="Photo"
//               placeholder={
//                 account.image_id ||
//                 'https://res.cloudinary.com/offerglee/image/upload/c_fill,h_240,w_240/v1515295582/image-placeholder-1280-960.png'
//               }
//               previewWidth={120}
//               previewHeight={120}
//               cloudinaryOpts={{
//                 upload_preset: this.props.store.webConfig.CLOUDINARY_PROFILE_UPLOAD_PRESET,
//                 cropping: 'server',
//                 cropping_coordinates_mode: 'custom',
//                 cropping_show_back_button: true,
//                 cropping_aspect_ratio: 1,
//                 min_image_height: 600,
//                 min_image_width: 600,
//                 cropping_validate_dimensions: true,
//                 cropping_default_selection_ratio: 1,
//               }}
//               direction="row"
//               component={PhotoInput}
//             />
//             <Field type="text" name="name" label="Display name" component={TextInput} />
//             <Field multiline name="about" label="About" component={TextInput} />
//             <Field type="text" name="zip" label="Zip" component={TextInput} />
//             <Field type="url" name="url" label="Website URL" component={TextInput} />

//             {isEmpty(errors) || (
//               <Text
//                 style={{
//                   color: 'red',
//                   paddingHorizontal: 20,
//                   paddingBottom: 20,
//                 }}
//               >
//                 Correct the errors above and try again.
//               </Text>
//             )}

//             <View style={{ paddingHorizontal: 20, paddingBottom: 40 }}>
//               <SubmitButton disabled={isSubmitting || !isEmpty(errors)} onPress={handleSubmit}>
//                 Save
//               </SubmitButton>
//             </View>
//           </Form>
//         )}
//       />
//     );
//   }
// }
