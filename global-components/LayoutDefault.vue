<template lang="pug">
  div(style="width: 100%")
    .search__container
      .search(@click="$emit('search', true)")
        .search__icon
          icon-search
        .search__text Search
    .container
      slot
      tm-content-cards(v-if="$frontmatter.cards")
</template>

<style lang="stylus" scoped>
.search
  display flex
  align-items center
  color rgba(22, 25, 49, 0.65)
  padding-top 0.5rem
  width calc(var(--aside-width) - 6rem)
  cursor pointer
  position absolute
  top 1rem
  right 4rem
  justify-content flex-end

  &__container
    visibility hidden
    display flex
    justify-content flex-end
    margin-top 1rem
    margin-bottom 1rem

  &__icon
    width 1.5rem
    height 1.5rem
    fill #aaa
    margin-right 0.5rem


.footer__links
  padding-top 5rem
  padding-bottom 1rem
  border-top 1px solid rgba(176, 180, 207, 0.2)
  margin-top 5rem

.links
  display flex
  justify-content space-between
  margin-top 4rem

  a
    box-shadow none
    color var(--accent-color)

.container
  position relative
  min-height 100vh
  width 100%

.content
  padding-right var(--sidebar-width)
  width 100%
  position relative

  &.noAside
    padding-right 0

  &__container
    width 100%
    padding-left 4rem
    padding-right 2rem

    &.noAside
      max-width initial

/deep/
  .codeblock
    margin-top 1rem
    margin-bottom 1rem

  .custom-block

    &.danger, &.warning, &.tip
      padding 1rem 1.5rem 1rem 3.5rem
      border-radius .5rem
      position relative

      & :first-child
        margin-top 0

      & :last-child
        margin-bottom 0

      &:before
        content ""
        height 24px
        width 24px
        position absolute
        display block
        top 1rem
        left 1rem
        background-repeat no-repeat

    &.danger
      background #FFF6F9

      &:before
        background-image url("data:image/svg+xml;utf8,<svg width='20' height='22' viewBox='0 0 20 22' fill='none' xmlns='http://www.w3.org/2000/svg'> <path fill-rule='evenodd' clip-rule='evenodd' d='M6.98778 1.05104C5.72494 1.83318 4.01138 2.89448 0 3.66667C0 13.2917 4.28571 18.7917 10 22C15.7143 18.7917 20 13.2917 20 3.66667C15.9886 2.89448 14.2751 1.83318 13.0122 1.05104C12.0264 0.440459 11.3152 0 10 0C8.68478 0 7.97362 0.440459 6.98778 1.05104ZM11 6C11 5.44772 10.5523 5 10 5C9.44771 5 9 5.44772 9 6V12C9 12.5523 9.44771 13 10 13C10.5523 13 11 12.5523 11 12V6ZM11 15.99C11 15.4377 10.5523 14.99 10 14.99C9.44771 14.99 9 15.4377 9 15.99V16.01C9 16.5623 9.44771 17.01 10 17.01C10.5523 17.01 11 16.5623 11 16.01V15.99Z' fill='%23DD285E'/> </svg>")

    &.warning

      &:before
        background-image url("data:image/svg+xml;utf8,<svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'> <path fill-rule='evenodd' clip-rule='evenodd' d='M22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11ZM12 6C12 5.44772 11.5523 5 11 5C10.4477 5 10 5.44772 10 6H11L10 6.00003V6.00013V6.0003V6.00053V6.00082V6.00118V6.00161V6.0021V6.00265V6.00327V6.00396V6.00471V6.00552V6.0064V6.00734V6.00835V6.00942V6.01055V6.01175V6.01301V6.01433V6.01572V6.01717V6.01869V6.02026V6.0219V6.02361V6.02537V6.0272V6.02909V6.03104V6.03306V6.03514V6.03728V6.03948V6.04174V6.04406V6.04645V6.0489V6.0514V6.05397V6.0566V6.0593V6.06205V6.06486V6.06773V6.07067V6.07366V6.07672V6.07983V6.083V6.08624V6.08953V6.09289V6.0963V6.09977V6.1033V6.10689V6.11054V6.11425V6.11802V6.12184V6.12573V6.12967V6.13367V6.13773V6.14185V6.14603V6.15026V6.15455V6.1589V6.1633V6.16777V6.17229V6.17687V6.1815V6.18619V6.19094V6.19575V6.20061V6.20553V6.2105V6.21553V6.22062V6.22576V6.23096V6.23621V6.24152V6.24689V6.25231V6.25778V6.26332V6.2689V6.27454V6.28024V6.28599V6.29179V6.29765V6.30357V6.30953V6.31556V6.32163V6.32776V6.33395V6.34018V6.34647V6.35282V6.35921V6.36566V6.37217V6.37872V6.38533V6.39199V6.39871V6.40548V6.41229V6.41917V6.42609V6.43306V6.44009V6.44717V6.4543V6.46148V6.46872V6.476V6.48334V6.49072V6.49816V6.50565V6.51319V6.52078V6.52842V6.53611V6.54385V6.55164V6.55948V6.56737V6.57531V6.5833V6.59134V6.59943V6.60757V6.61575V6.62399V6.63227V6.64061V6.64899V6.65742V6.6659V6.67443V6.683V6.69163V6.7003V6.70902V6.71779V6.7266V6.73547V6.74438V6.75333V6.76234V6.77139V6.78049V6.78963V6.79883V6.80806V6.81735V6.82668V6.83606V6.84548V6.85495V6.86447V6.87403V6.88364V6.89329V6.90299V6.91273V6.92252V6.93235V6.94223V6.95215V6.96212V6.97213V6.98219V6.99229V7.00243V7.01262V7.02285V7.03313V7.04345V7.05382V7.06422V7.07468V7.08517V7.09571V7.10629V7.11691V7.12758V7.13829V7.14904V7.15983V7.17067V7.18155V7.19247V7.20343V7.21444V7.22548V7.23657V7.2477V7.25887V7.27008V7.28134V7.29263V7.30397V7.31534V7.32676V7.33822V7.34971V7.36125V7.37283V7.38445V7.39611V7.40781V7.41954V7.43132V7.44314V7.45499V7.46689V7.47883V7.4908V7.50281V7.51486V7.52695V7.53908V7.55125V7.56346V7.5757V7.58798V7.6003V7.61266V7.62506V7.63749V7.64996V7.66247V7.67501V7.6876V7.70022V7.71287V7.72557V7.7383V7.75106V7.76387V7.77671V7.78958V7.8025V7.81544V7.82843V7.84145V7.8545V7.86759V7.88072V7.89388V7.90708V7.92031V7.93357V7.94688V7.96021V7.97358V7.98699V8.00043V8.0139V8.02741V8.04095V8.05453V8.06813V8.08178V8.09546V8.10917V8.12291V8.13668V8.15049V8.16434V8.17821V8.19212V8.20606V8.22003V8.23404V8.24808V8.26214V8.27625V8.29038V8.30454V8.31874V8.33297V8.34723V8.36152V8.37584V8.3902V8.40458V8.419V8.43344V8.44792V8.46243V8.47696V8.49153V8.50613V8.52076V8.53541V8.5501V8.56482V8.57956V8.59434V8.60914V8.62398V8.63884V8.65373V8.66866V8.68361V8.69858V8.71359V8.72863V8.74369V8.75878V8.7739V8.78905V8.80422V8.81943V8.83466V8.84991V8.8652V8.88051V8.89585V8.91122V8.92661V8.94203V8.95748V8.97295V8.98845V9.00397V9.01953V9.0351V9.05071V9.06634V9.08199V9.09767V9.11338V9.12911V9.14487V9.16065V9.17645V9.19228V9.20814V9.22402V9.23993V9.25585V9.27181V9.28779V9.30379V9.31981V9.33586V9.35194V9.36803V9.38415V9.4003V9.41646V9.43265V9.44886V9.4651V9.48136V9.49764V9.51394V9.53027V9.54662V9.56298V9.57938V9.59579V9.61223V9.62868V9.64516V9.66166V9.67818V9.69473V9.71129V9.72787V9.74448V9.76111V9.77775V9.79442V9.81111V9.82782V9.84455V9.86129V9.87806V9.89485V9.91166V9.92848V9.94533V9.96219V9.97908V9.99599V10.0129V10.0298V10.0468V10.0638V10.0808V10.0978V10.1148V10.1319V10.149V10.166V10.1832V10.2003V10.2174V10.2346V10.2518V10.2689V10.2862V10.3034V10.3206V10.3379V10.3552V10.3725V10.3898V10.4071V10.4244V10.4418V10.4592V10.4766V10.494V10.5114V10.5288V10.5463V10.5637V10.5812V10.5987V10.6162V10.6338V10.6513V10.6689V10.6864V10.704V10.7216V10.7392V10.7569V10.7745V10.7922V10.8098V10.8275V10.8452V10.8629V10.8806V10.8984V10.9161V10.9339V10.9516V10.9694V10.9872V11.005V11.0229V11.0407V11.0585V11.0764V11.0943V11.1121V11.13V11.1479V11.1659V11.1838V11.2017V11.2197V11.2376V11.2556V11.2736V11.2916V11.3096V11.3276V11.3456V11.3636V11.3817V11.3997V11.4178V11.4358V11.4539V11.472V11.4901V11.5082V11.5263V11.5444V11.5626V11.5807V11.5989V11.617V11.6352V11.6533V11.6715V11.6897V11.7079V11.7261V11.7443V11.7625V11.7808V11.799V11.8172V11.8355V11.8537V11.872V11.8903V11.9085V11.9268V11.9451V11.9634V11.9817V12C10 12.5523 10.4477 13 11 13C11.5523 13 12 12.5523 12 12V11.9817V11.9634V11.9451V11.9268V11.9085V11.8903V11.872V11.8537V11.8355V11.8172V11.799V11.7808V11.7625V11.7443V11.7261V11.7079V11.6897V11.6715V11.6533V11.6352V11.617V11.5989V11.5807V11.5626V11.5444V11.5263V11.5082V11.4901V11.472V11.4539V11.4358V11.4178V11.3997V11.3817V11.3636V11.3456V11.3276V11.3096V11.2916V11.2736V11.2556V11.2376V11.2197V11.2017V11.1838V11.1659V11.1479V11.13V11.1121V11.0943V11.0764V11.0585V11.0407V11.0229V11.005V10.9872V10.9694V10.9516V10.9339V10.9161V10.8984V10.8806V10.8629V10.8452V10.8275V10.8098V10.7922V10.7745V10.7569V10.7392V10.7216V10.704V10.6864V10.6689V10.6513V10.6338V10.6162V10.5987V10.5812V10.5637V10.5463V10.5288V10.5114V10.494V10.4766V10.4592V10.4418V10.4244V10.4071V10.3898V10.3725V10.3552V10.3379V10.3206V10.3034V10.2862V10.2689V10.2518V10.2346V10.2174V10.2003V10.1832V10.166V10.149V10.1319V10.1148V10.0978V10.0808V10.0638V10.0468V10.0298V10.0129V9.99599V9.97908V9.96219V9.94533V9.92848V9.91166V9.89485V9.87806V9.86129V9.84455V9.82782V9.81111V9.79442V9.77775V9.76111V9.74448V9.72787V9.71129V9.69473V9.67818V9.66166V9.64516V9.62868V9.61223V9.59579V9.57938V9.56298V9.54662V9.53027V9.51394V9.49764V9.48136V9.4651V9.44886V9.43265V9.41646V9.4003V9.38415V9.36803V9.35194V9.33586V9.31981V9.30379V9.28779V9.27181V9.25585V9.23993V9.22402V9.20814V9.19228V9.17645V9.16065V9.14487V9.12911V9.11338V9.09767V9.08199V9.06634V9.05071V9.0351V9.01953V9.00397V8.98845V8.97295V8.95748V8.94203V8.92661V8.91122V8.89585V8.88051V8.8652V8.84991V8.83466V8.81943V8.80422V8.78905V8.7739V8.75878V8.74369V8.72863V8.71359V8.69858V8.68361V8.66866V8.65373V8.63884V8.62398V8.60914V8.59434V8.57956V8.56482V8.5501V8.53541V8.52076V8.50613V8.49153V8.47696V8.46243V8.44792V8.43344V8.419V8.40458V8.3902V8.37584V8.36152V8.34723V8.33297V8.31874V8.30454V8.29038V8.27625V8.26214V8.24808V8.23404V8.22003V8.20606V8.19212V8.17821V8.16434V8.15049V8.13668V8.12291V8.10917V8.09546V8.08178V8.06813V8.05453V8.04095V8.02741V8.0139V8.00043V7.98699V7.97358V7.96021V7.94688V7.93357V7.92031V7.90708V7.89388V7.88072V7.86759V7.8545V7.84145V7.82843V7.81544V7.8025V7.78958V7.77671V7.76387V7.75106V7.7383V7.72557V7.71287V7.70022V7.6876V7.67501V7.66247V7.64996V7.63749V7.62506V7.61266V7.6003V7.58798V7.5757V7.56346V7.55125V7.53908V7.52695V7.51486V7.50281V7.4908V7.47883V7.46689V7.45499V7.44314V7.43132V7.41954V7.40781V7.39611V7.38445V7.37283V7.36125V7.34971V7.33822V7.32676V7.31534V7.30397V7.29263V7.28134V7.27008V7.25887V7.2477V7.23657V7.22548V7.21444V7.20343V7.19247V7.18155V7.17067V7.15983V7.14904V7.13829V7.12758V7.11691V7.10629V7.09571V7.08517V7.07468V7.06422V7.05382V7.04345V7.03313V7.02285V7.01262V7.00243V6.99229V6.98219V6.97213V6.96212V6.95215V6.94223V6.93235V6.92252V6.91273V6.90299V6.89329V6.88364V6.87403V6.86447V6.85495V6.84548V6.83606V6.82668V6.81735V6.80806V6.79883V6.78963V6.78049V6.77139V6.76234V6.75333V6.74438V6.73547V6.7266V6.71779V6.70902V6.7003V6.69163V6.683V6.67443V6.6659V6.65742V6.64899V6.64061V6.63227V6.62399V6.61575V6.60757V6.59943V6.59134V6.5833V6.57531V6.56737V6.55948V6.55164V6.54385V6.53611V6.52842V6.52078V6.51319V6.50565V6.49816V6.49072V6.48334V6.476V6.46872V6.46148V6.4543V6.44717V6.44009V6.43306V6.42609V6.41917V6.41229V6.40548V6.39871V6.39199V6.38533V6.37872V6.37217V6.36566V6.35921V6.35282V6.34647V6.34018V6.33395V6.32776V6.32163V6.31556V6.30953V6.30357V6.29765V6.29179V6.28599V6.28024V6.27454V6.2689V6.26332V6.25778V6.25231V6.24689V6.24152V6.23621V6.23096V6.22576V6.22062V6.21553V6.2105V6.20553V6.20061V6.19575V6.19094V6.18619V6.1815V6.17687V6.17229V6.16777V6.1633V6.1589V6.15455V6.15026V6.14603V6.14185V6.13773V6.13367V6.12967V6.12573V6.12184V6.11802V6.11425V6.11054V6.10689V6.1033V6.09977V6.0963V6.09289V6.08953V6.08624V6.083V6.07983V6.07672V6.07366V6.07067V6.06773V6.06486V6.06205V6.0593V6.0566V6.05397V6.0514V6.0489V6.04645V6.04406V6.04174V6.03948V6.03728V6.03514V6.03306V6.03104V6.02909V6.0272V6.02537V6.02361V6.0219V6.02026V6.01869V6.01717V6.01572V6.01433V6.01301V6.01175V6.01055V6.00942V6.00835V6.00734V6.0064V6.00552V6.00471V6.00396V6.00327V6.00265V6.0021V6.00161V6.00118V6.00082V6.00053V6.0003V6.00013V6.00003L11 6H12ZM12 15.99C12 15.4377 11.5523 14.99 11 14.99C10.4477 14.99 10 15.4377 10 15.99V16.01C10 16.5623 10.4477 17.01 11 17.01C11.5523 17.01 12 16.5623 12 16.01V15.99Z' fill='%23E6900A'/> </svg>")

    &.tip

      &:before
        background-image url("data:image/svg+xml;utf8,<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'> <path fill-rule='evenodd' clip-rule='evenodd' d='M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z' stroke='%2366A1FF' stroke-width='1.5'/> <path fill-rule='evenodd' clip-rule='evenodd' d='M13.5 6.5C13.5 5.6715 12.8285 5 12 5C11.1715 5 10.5 5.6715 10.5 6.5C10.5 7.3285 11.1715 8 12 8C12.8285 8 13.5 7.3285 13.5 6.5ZM10 17.5V18.5H14V17.5H13V10H10V11H11V17.5H10Z' fill='%2366A1FF'/> </svg>")

  h2, h3, h4, h5, h6

    &:hover
      a.header-anchor
        opacity 1

  a.header-anchor
    opacity 0
    position absolute
    font-weight 400
    left -1.5em
    width 1.5em
    text-align center
    box-sizing border-box
    color rgba(0,0,0,.5)
    transition all .25s

    &:after
      transition all .25s
      border-radius .25rem
      content attr(data-header-anchor-text)
      width 4rem
      color white
      position absolute
      top -2.5em
      padding 7px 12px
      white-space nowrap
      left 50%
      transform translateX(-50%)
      font-size .8125rem
      line-height 1
      opacity 0
      box-shadow 0px 16px 32px rgba(22, 25, 49, 0.08), 0px 8px 12px rgba(22, 25, 49, 0.06), 0px 1px 0px rgba(22, 25, 49, 0.05)
      background #161931

    &:before
      transition all .25s
      content ""
      background-image: url("data:image/svg+xml,  <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24'><path fill='rgb(22, 25, 49)' d='M12 21l-12-18h24z'/></svg>");
      position absolute
      width 8px
      height 8px
      top -.7em
      left 50%
      font-size .5rem
      transform translateX(-50%)
      opacity 0

    &:hover:before
      opacity 1

    &:hover:after
      opacity 1

  h1[id*="requisite"], h2[id*="requisite"], h3[id*="requisite"], h4[id*="requisite"], h5[id*="requisite"], h6[id*="requisite"]
    display none
    align-items center
    cursor pointer

    &:before
      content ""
      width 24px
      height 24px
      display block
      margin-right .75rem
      background url('./images/icon-chevron.svg')
      transition all .25s

  h1[id*="requisite"].prereqTitleShow, h2[id*="requisite"].prereqTitleShow, h3[id*="requisite"].prereqTitleShow, h4[id*="requisite"].prereqTitleShow, h5[id*="requisite"].prereqTitleShow, h6[id*="requisite"].prereqTitleShow

    &:before
      transform rotate(90deg)

  h1[id*="requisite"] + ul, h2[id*="requisite"] + ul, h3[id*="requisite"] + ul, h4[id*="requisite"] + ul, h5[id*="requisite"] + ul, h6[id*="requisite"] + ul
    padding-left initial
    display none

  li[prereq]
    padding-left initial
    display none

    &:before
      display none

  li[prereq].prereqLinkShow
    display block

  li[prereq] a[href]
    box-shadow 0px 2px 4px rgba(22, 25, 49, 0.05), 0px 0px 1px rgba(22, 25, 49, 0.2), 0px 0.5px 0px rgba(22, 25, 49, 0.05)
    padding 1rem
    border-radius 0.5rem
    color #161931
    font-size 0.875rem
    font-weight 500
    line-height 20px
    margin 1rem 0
    display block
    letter-spacing 0.01em

    &:hover
      color inherit

  [synopsis]
    padding 1.5rem 2rem
    background-color rgba(176, 180, 207, 0.09)
    border-radius 0.5rem
    margin-top 3rem
    margin-bottom 3rem
    letter-spacing 0.01em
    color rgba(22, 25, 49, 0.9)
    font-size 0.875rem
    line-height 20px

    &:before
      content "Synopsis"
      display block
      color rgba(22, 25, 49, 0.65)
      text-transform uppercase
      font-size 0.75rem
      margin-bottom 0.5rem
      letter-spacing 0.2em

  [synopsis]
    & a
      box-shadow none

    & a:hover
      box-shadow none

    & a code
      box-shadow 0 1px 0 0 rgba(80, 100, 251, 0.3), 0 0 0 3px #f8f8fb

    & a:hover code
      box-shadow 0 1px 0 0 rgba(80, 100, 251, 1), 0 0 0 3px #f8f8fb

    & a:active code
      color rgba(80, 100, 251, 0.6)
      box-shadow 0 1px 0 0 rgba(80, 100, 251, 0.3), 0 0 0 3px #f8f8fb

  a[target='_blank']:after
    content url('./images/icon-outbound.svg')
    padding-left 3px

  .icon.outbound
    display none

  table
    width 100%
    line-height 24px
    margin-top 2rem
    margin-bottom 2rem
    box-shadow 0 0 0 1px rgba(140, 145, 177, 0.32)
    border-radius .5rem
    border-collapse collapse

  td
    word-break break-word

  th
    text-align left
    font-weight 600
    font-size 0.875rem

  td, th
    padding 0.75rem

  tr
    box-shadow 0 1px 0 0 rgba(140, 145, 177, 0.32)

  tr:only-child
    box-shadow none

  thead tr:only-child
    box-shadow 0 1px 0 0 rgba(140, 145, 177, 0.32)

  tr + tr:last-child
    box-shadow none

  tr:last-child td
    border-bottom none

  .code-block__container
    margin-top 2rem
    margin-bottom 2rem

  .content__default
    width 100%

  h1, h2, h3, h4
    font-weight 600

  h1 code, h2 code, h3 code
    font-weight normal

  .content__container
    img
      max-width 100%

  .term
    text-decoration underline

  img
    width 100%
    height auto
    display block

  .tooltip
    h1
      font-size 0.875rem
      font-weight 500
      margin-bottom 0

    p
      margin-top 0
      margin-bottom 0
      line-height 1.5

  strong
    font-weight 600

  em
    font-style italic

  h1
    font-size 2.5rem
    font-weight 600
    margin-bottom 3rem
    line-height 3.25rem
    letter-spacing -0.03em

  h2
    font-size 1.5rem
    font-weight 600
    margin-top 3rem
    margin-bottom 1.5rem
    line-height 2rem
    letter-spacing -0.01em

  h3
    font-size 1.25rem
    font-weight 600
    margin-top 2rem
    margin-bottom 1rem
    letter-spacing -0.01em

  p
    margin-top 1rem
    margin-bottom 1rem
    line-height 1.5rem

  ul, ol
    line-height 1.5
    margin-top 1rem
    padding-left 0.75rem
    margin-bottom 1.5rem

  li
    padding-left 2rem
    list-style none
    margin-bottom 1rem
    position relative

    &:before
      content ''
      width 1rem
      height 1rem
      background url('./images/bullet-list.svg') no-repeat top left
      position absolute
      top 0.35rem
      left 0

  code
    background-color rgba(176, 180, 207, 0.2)
    border 1px solid rgba(176, 180, 207, 0.09)
    border-radius 0.25rem
    padding-left 0.25rem
    padding-right 0.25rem
    font-size 0.8125rem
    font-family 'Menlo', 'Monaco', 'Fira Code', monospace
    color #46509F
    margin-top 3rem

  h1, h2, h3, h4, h5, h6
    code
      font-size inherit

  p, ul, ol
    a
      color var(--accent-color)
      box-shadow inset 0 -0.5px 0 rgba(80, 100, 251, 0.7)
      outline none

    a:focus
      box-shadow 0 0 0 3px rgba(102, 161, 255, 0.7)
      border-radius 0.25rem

    a:visited
      color rgba(146, 20, 177, 1)

    a:visited:hover
      color var(--accent-color)

    a:hover
      box-shadow inset 0 -1px 0 rgba(80, 100, 251, 1)

    a:active
      color rgba(80, 100, 251, 0.6)
      border-radius 0
      box-shadow inset 0 -0.5px 0 rgba(80, 100, 251, 0.3)

    a code
      border-bottom none
      box-shadow 0 1px 0 0 rgba(80, 100, 251, 0.3), 0 0 0 3px white
      color rgba(80, 100, 251, 1)

    a:hover code
      box-shadow 0 1px 0 0 rgba(80, 100, 251, 1), 0 0 0 3px white

    a:active code
      color rgba(80, 100, 251, 0.6)
      box-shadow 0 1px 0 0 rgba(80, 100, 251, 0.3), 0 0 0 3px white
      background-color rgba(176, 180, 207, 0.1)
      border 1px solid rgba(176, 180, 207, 0.045)
      border-bottom none
      border-radius 0.25rem

    a:focus code
      box-shadow 0 1px 0 0 rgba(80, 100, 251, 0.3), 0 0 0 3px rgba(102, 161, 255, 0.7)

@media screen and (max-width: 1136px)
  >>> h2, >>> h3, >>> h4, >>> h5, >>> h6
    padding-right 1.5rem

  >>> a.header-anchor
    left initial
    right 0
    opacity 1

    &:after
      transform none
      left initial
      right -5px

  >>> h1 a.header-anchor
    display none

@media screen and (max-width: 1024px)
  .content
    padding-right 0

    &__container
      padding-left 2rem

@media screen and (max-width: 1136px) and (min-width: 833px)
  .search__container
    visibility visible

@media screen and (max-width: 1136px)
  >>> h1[id*="requisite"], >>> h2[id*="requisite"], >>> h3[id*="requisite"], >>> h4[id*="requisite"], >>> h5[id*="requisite"], >>> h6[id*="requisite"]
    display flex

  >>> h1[id*="requisite"] + ul, >>> h2[id*="requisite"] + ul, >>> h3[id*="requisite"] + ul, >>> h4[id*="requisite"] + ul, >>> h5[id*="requisite"] + ul, >>> h6[id*="requisite"] + ul
    display block
</style>

<script>
import { findIndex, sortBy } from "lodash";
import copy from "clipboard-copy";

export default {
  props: {
    aside: {
      type: Boolean,
      default: true,
    },
    tree: {
      type: Array,
    },
  },
  mounted() {
    this.emitPrereqLinks();
    const headerAnchorClick = (event) => {
      event.target.setAttribute("data-header-anchor-text", "Copied!");
      copy(event.target.href);
      setTimeout(() => {
        event.target.setAttribute("data-header-anchor-text", "Copy link!");
      }, 1000);
      event.preventDefault();
    };
    document
      .querySelectorAll(
        'h1[id*="requisite"], h2[id*="requisite"], h3[id*="requisite"], h4[id*="requisite"], h5[id*="requisite"], h6[id*="requisite"]'
      )
      .forEach((node) => {
        node.addEventListener("click", this.prereqToggle);
      });
    document
      .querySelectorAll(".content__default a.header-anchor")
      .forEach((node) => {
        node.setAttribute("data-header-anchor-text", "Copy link");
        node.addEventListener("click", headerAnchorClick);
      });
    if (window.location.hash) {
      const elementId = document.querySelector(window.location.hash);
      if (elementId) elementId.scrollIntoView();
    }
  },
  methods: {
    emitPrereqLinks() {
      const prereq = [...document.querySelectorAll("[prereq]")].map((item) => {
        const link = item.querySelector("[href]");
        return {
          href: link.getAttribute("href"),
          text: link.innerText,
        };
      });
      this.$emit("prereq", prereq);
    },
    prereqToggle(e) {
      e.target.classList.toggle("prereqTitleShow");
      document.querySelectorAll("[prereq]").forEach((node) => {
        node.classList.toggle("prereqLinkShow");
      });
    },
  },
  computed: {
    noAside() {
      return !this.aside;
    },
    linkPrevNext() {
      if (!this.tree) return;
      let result = {};
      const search = (tree) => {
        return tree.forEach((item) => {
          const children = item.children;
          if (children) {
            const index = findIndex(children, ["regularPath", this.$page.path]);
            if (index >= 0 && children[index - 1]) {
              result.prev = children[index - 1];
            }
            if (index >= 0 && children[index + 1]) {
              result.next = children[index + 1];
            }
            return search(item.children);
          }
        });
      };
      search(this.tree);
      return result;
    },
  },
};
</script>
