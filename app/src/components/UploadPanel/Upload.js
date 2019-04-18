// @flow
import * as React from 'react'
import UploadInput from './UploadInput'
import ConfirmUploadModal from './ConfirmUploadModal'
import UploadMenu from './UploadMenu'

type Props = {
  filename: ?string,
  sessionLoaded: ?boolean,
  createSession: (file: File) => mixed,
}

type State = {
  uploadedFile: ?File,
}

export default class Upload extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { uploadedFile: null }
  }

  onUpload = (
    event: SyntheticInputEvent<HTMLInputElement> | SyntheticDragEvent<*>
  ) => {
    let files: Array<File> = []
    if (event.dataTransfer && event.dataTransfer.files) {
      files = (event.dataTransfer.files: any)
    } else if (event.target.files) {
      files = (event.target.files: any)
    }

    if (this.props.sessionLoaded) {
      this.setState({ uploadedFile: files[0] })
    } else {
      this.props.createSession(files[0])
    }

    event.currentTarget.value = ''
  }

  confirmUpload = () => {
    const { uploadedFile } = this.state

    if (uploadedFile) {
      this.props.createSession(uploadedFile)
      this.forgetUpload()
    }
  }

  forgetUpload = () => {
    this.setState({ uploadedFile: null })
  }

  render() {
    const { uploadedFile } = this.state
    const { filename } = this.props

    return (
      <React.Fragment>
        {filename && <UploadMenu />}
        <UploadInput onUpload={this.onUpload} isButton />
        <UploadInput onUpload={this.onUpload} />

        {uploadedFile && (
          <ConfirmUploadModal
            confirm={this.confirmUpload}
            cancel={this.forgetUpload}
          />
        )}
      </React.Fragment>
    )
  }
}
