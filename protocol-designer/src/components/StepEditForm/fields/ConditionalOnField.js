// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { selectors as stepFormSelectors } from '../../../step-forms'

import type { BaseState } from '../../../types'
import type { StepFieldName } from '../../../form-types'

type SP = {
  value: mixed,
}

type OP = {
  name: StepFieldName,
  condition: (value: mixed) => boolean,
  children: React.Node,
}

type Props = SP & OP

function ConditionalOnField(props: Props) {
  return props.condition(props.value) ? props.children : null
}

function STP(state: BaseState, ownProps: OP): SP {
  const formData = stepFormSelectors.getUnsavedForm(state)
  return {
    value: formData ? formData[ownProps.name] : null,
  }
}

export default connect(STP)(ConditionalOnField)
