
<!-- #include "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [End to End Integration](#end-to-end-integration)
- [Linting](#linting)
- [App folder](#app-folder)
- [Assets Folder](#assets-folder)
- [Code Re-use](#code-re-use)
- [It Emphasizes Smaller Modules](#it-emphasizes-smaller-modules)
- [apps folder](#apps-folder)
- [libs folder](#libs-folder)
- [tsconfig, test, and linting](#tsconfig-test-and-linting)
- [Sidestep\...](#sidestep)
- [Install Codelyzer If Not Using CLI](#install-codelyzer-if-not-using-cli)
- [Add rules to tslint.json](#add-rules-to-tslintjson)
- [Install the Lighthouse Node CLI](#install-the-lighthouse-node-cli)
- [Tree Deepdive](#tree-deepdive)
- [Generating a Folder using Schematics](#generating-a-folder-using-schematics)
- [What NPM Link Actually Does?](#what-npm-link-actually-does)
- [Generate a workspace specific schematic](#generate-a-workspace-specific-schematic)
- [Adding in External Schematics](#adding-in-external-schematics)
- [Adding GraphQL Files](#adding-graphql-files)
- [Generatng configuration for Nrwl/nx](#generatng-configuration-for-nrwlnx)
- [Serve storybook using Nrwl Nx](#serve-storybook-using-nrwl-nx)
- [Cool Features Offered Out of the Box](#cool-features-offered-out-of-the-box)
- [how it works](#how-it-works)
- [sourceMap](#sourcemap)
- [The Multiple Interface Dilemma](#the-multiple-interface-dilemma)
- [What is a Module](#what-is-a-module)
- [Example of Module in Typescript](#example-of-module-in-typescript)
- [Creating a Global Namespace](#creating-a-global-namespace)
- [Fantastic Moment.js Example](#fantastic-momentjs-example)
- [Creating a Github Repo](#creating-a-github-repo)
- [Running npm init](#running-npm-init)
- [Install Typescript and modify tsconfig.json](#install-typescript-and-modify-tsconfigjson)
- [Adding Ability to Build Typescript](#adding-ability-to-build-typescript)
- [Colors](#colors)
- [Grid and Spacing](#grid-and-spacing)
- [Theming your Material Design](#theming-your-material-design)
- [Primary and Secondary Values](#primary-and-secondary-values)
- [Material Color Maps](#material-color-maps)
- [Create a \_themes.scss file](#create-a-_themesscss-file)
- [Angular Material Cards](#angular-material-cards)
- [Code Example](#code-example)
- [Promise](#promise)
- [Counter](#counter)
- [Event](#event)
- [AJAX Request](#ajax-request)
- [Sophisticated Manipulation](#sophisticated-manipulation)
- [Link Operators Together](#link-operators-together)
- [No subscribe, No describe](#no-subscribe-no-describe)
- [Common Operators](#common-operators)
- [BehaviorSubject](#behaviorsubject)
- [ReplaySubject](#replaysubject)
- [Why Dollar sign was chosen as a convention](#why-dollar-sign-was-chosen-as-a-convention)
- [Benefits of Naming Convention](#benefits-of-naming-convention)
- [What to watch out for](#what-to-watch-out-for)
- [What to do instead](#what-to-do-instead)
- [What to watch out for](#what-to-watch-out-for-1)
- [What to do instead](#what-to-do-instead-1)
- [What to watch out for](#what-to-watch-out-for-2)
- [What to do instead](#what-to-do-instead-2)
- [What to watch out for](#what-to-watch-out-for-3)
- [What to do instead](#what-to-do-instead-3)
- [What to watch out for](#what-to-watch-out-for-4)
- [What to do instead](#what-to-do-instead-4)
- [Concern One - Business Logic in View Layer](#concern-one-business-logic-in-view-layer)
- [Concern Two - State](#concern-two-state)
- [How to Setup a Config File for App.](#how-to-setup-a-config-file-for-app)
- [Creating a Config Service](#creating-a-config-service)
- [Load Files Prior to App Creation](#load-files-prior-to-app-creation)
- [Animations](#animations)
- [Assets](#assets)
- [Core](#core)
- [Models](#models)
- [Testing](#testing)
- [UI](#ui)
- [Utils](#utils)
- [Styles](#styles)
- [Vendor](#vendor)
- [Editing app.module.routing.ts File](#editing-appmoduleroutingts-file)
- [Side bar - User Experience and Lazy Loaded Images](#side-bar-user-experience-and-lazy-loaded-images)
- [Install](#install)
- [Setup](#setup)
- [General Strategy](#general-strategy)
- [Strategy Exemplified in Code](#strategy-exemplified-in-code)
  - [Give Route Unique Data](#give-route-unique-data)
  - [Custom Function For Pre-Loading](#custom-function-for-pre-loading)
  - [Pass in custom pre-loading as a Provider](#pass-in-custom-pre-loading-as-a-provider)
- [General Strategy For Event Driven Preloading](#general-strategy-for-event-driven-preloading)
- [Strategy Exemplified in Code](#strategy-exemplified-in-code-1)
  - [Give Route Unique Data](#give-route-unique-data-1)
  - [Create a Separate Service to Trigger Pre-Loading](#create-a-separate-service-to-trigger-pre-loading)
  - [Custom Pre-Loading Service](#custom-pre-loading-service)
  - [Pass in Custom Pre-loading Service as a Provider](#pass-in-custom-pre-loading-service-as-a-provider)
  - [Trigger Service](#trigger-service)
- [Network Information API](#network-information-api)
- [Strategy Exemplified in Code](#strategy-exemplified-in-code-2)
- [Performance Impact of Unused Modules](#performance-impact-of-unused-modules)
- [Creating Custom Directive Validator](#creating-custom-directive-validator)
  - [Generate The Directive](#generate-the-directive)
  - [Create The Function for Directive](#create-the-function-for-directive)
  - [Hook In Validator Function to Directive](#hook-in-validator-function-to-directive)
  - [Hook In Directive to Component Template](#hook-in-directive-to-component-template)
- [A Word on This Approach](#a-word-on-this-approach)
- [Sample Validator Logic](#sample-validator-logic)
  - [Creating the Service](#creating-the-service)
  - [Creating the Directive](#creating-the-directive)
  - [Creating the error](#creating-the-error)
- [Integrating Service with Component for Async Validation](#integrating-service-with-component-for-async-validation)
- [Scaffolding Web Components Lib](#scaffolding-web-components-lib)
- [Create An elements.ts File and Export](#create-an-elementsts-file-and-export)
- [Reexport in index.ts file](#reexport-in-indexts-file)
- [Changing Target](#changing-target)
- [Importing library](#importing-library)
- [Tell Framework To Take Chill Pill](#tell-framework-to-take-chill-pill)
- [Actually Using Element](#actually-using-element)
- [Change Target](#change-target)
- [Change Target](#change-target-1)
- [Insert Component in Angualr App](#insert-component-in-angualr-app)
- [Update Target](#update-target)
- [Importing Library](#importing-library-1)
- [Adding Intrisic Types](#adding-intrisic-types)
- [Actually Using ELement](#actually-using-element-1)
- [Monolith Applications](#monolith-applications)
- [Separating Backend and Frontend](#separating-backend-and-frontend)
- [Creating Micoservices](#creating-micoservices)
- [Applying Microservice Architecture to Microfrontends](#applying-microservice-architecture-to-microfrontends)
- [Adding The Tools We Need](#adding-the-tools-we-need)
- [General Strategy](#general-strategy-1)
- [Authentication](#authentication)
- [CanActivate](#canactivate)
- [CanActivateChild](#canactivatechild)
- [CanDeactivate](#candeactivate)
- [CanLoad](#canload)
- [Resolve](#resolve)
- [Side note when using devtools with ngrx/router-store](#side-note-when-using-devtools-with-ngrxrouter-store)
- [Creating Injectable Service](#creating-injectable-service)
- [Including Injectable Service in Component](#including-injectable-service-in-component)
- [Import Locale Data for Other Languages](#import-locale-data-for-other-languages)
- [Add a Description and a Meaning](#add-a-description-and-a-meaning)
  - [Combination of Meaning and Description](#combination-of-meaning-and-description)
- [Setting up Custom ID](#setting-up-custom-id)
- [Using a Custom ID with a Description and/or Meaning](#using-a-custom-id-with-a-description-andor-meaning)
- [Translating attributes](#translating-attributes)
- [Alternative Text Messages](#alternative-text-messages)
- [Alternative + Plural Combined](#alternative-plural-combined)
- [Understanding the Angular Translation Process](#understanding-the-angular-translation-process)
- [XLIFF Editor](#xliff-editor)
- [Create a Translation Source File](#create-a-translation-source-file)
  - [Generating Different Translation Formats](#generating-different-translation-formats)
  - [Other Notable CLI options](#other-notable-cli-options)
- [Translate the source text](#translate-the-source-text)
- [Translating Plural](#translating-plural)
- [Translating Select](#translating-select)
- [Translating a Nested Expression](#translating-a-nested-expression)
- [AOT v. JIT](#aot-v-jit)
- [Merge Files with AOT Compiler](#merge-files-with-aot-compiler)
- [Configuration for Development Environment](#configuration-for-development-environment)
- [Configuration for Production Environment](#configuration-for-production-environment)
- [Merge Files with JIT Compiler](#merge-files-with-jit-compiler)
  - [Knowledge of Three Things](#knowledge-of-three-things)
  - [Three Providers To Be Aware Of](#three-providers-to-be-aware-of)
- [Merge Files with JIT Compiler In practice](#merge-files-with-jit-compiler-in-practice)
- [Specify Warning in Practice](#specify-warning-in-practice)
- [Using ng-container with i18n](#using-ng-container-with-i18n)
- [An Example](#an-example)
- [Accessing Object Data Within Arrays](#accessing-object-data-within-arrays)
- [Remembering Brackets](#remembering-brackets)
- [Active Router Links](#active-router-links)
- [Template Driven](#template-driven)
- [Reactive](#reactive)
- [Reactive Form Example](#reactive-form-example)
- [View To Model](#view-to-model)
- [Model To View](#model-to-view)
- [Built In Validators](#built-in-validators)
- [Custom Validators](#custom-validators)
- [Testing View To Model](#testing-view-to-model)
- [Testing Model To View](#testing-model-to-view)
- [Passing in Multiple Values](#passing-in-multiple-values)
- [Understanding Angulars Change Detection](#understanding-angulars-change-detection)
- [Events](#events)
- [ActivatedRoute](#activatedroute)
- [Using Wildcard with Styles](#using-wildcard-with-styles)
- [Combining Wildcard and Void States](#combining-wildcard-and-void-states)
- [:enter and :leave aliases](#enter-and-leave-aliases)
- [Debugging Animations using Callbacks](#debugging-animations-using-callbacks)
- [Offset](#offset)
- [So What is trackBy?](#so-what-is-trackby)
- [Track By Within Data Tables](#track-by-within-data-tables)
- [How to Gzip](#how-to-gzip)
- [Adding Lazysizes](#adding-lazysizes)
- [Rendering](#rendering)
- [Performance](#performance)
- [Streaming Server Rendering](#streaming-server-rendering)
- [Progressive Rehydration](#progressive-rehydration)
- [How Angular Universal Works](#how-angular-universal-works)
- [Dynamic of Browser APIs with Angular Universal](#dynamic-of-browser-apis-with-angular-universal)
- [Using Absolute URLs - Serving on Browser vs. Serving on Server](#using-absolute-urls-serving-on-browser-vs-serving-on-server)
- [Universal Template Engine](#universal-template-engine)
- [Security + Static Files](#security-static-files)
- [Sibling Components under Same Parent Component](#sibling-components-under-same-parent-component)
- [Official Material Design Breakpoints](#official-material-design-breakpoints)
- [Choosing Four Specific Breakpoints](#choosing-four-specific-breakpoints)
- [Of Four Breakpoints, Which Designs are Required?](#of-four-breakpoints-which-designs-are-required)
- [Does UX/UI Need to Follow these Breakpoints?](#does-uxui-need-to-follow-these-breakpoints)
- [Build Media Query Function](#build-media-query-function)
- [Setting up Ghost Labs](#setting-up-ghost-labs)
- [Notable Mentions of Ghost Labs](#notable-mentions-of-ghost-labs)
- [Final Words on Ghost Labs](#final-words-on-ghost-labs)
- [Addressing Additional two Offered by \@ngrx/store](#addressing-additional-two-offered-by-ngrxstore)
- [Asynchronous](#asynchronous)
- [Deterministic](#deterministic)
- [Create root state using nx ngrx](#create-root-state-using-nx-ngrx)
- [Create component state using nx ngrx](#create-component-state-using-nx-ngrx)
- [High level overview of nx ngrx](#high-level-overview-of-nx-ngrx)
- [Installing Redux Dev Tools](#installing-redux-dev-tools)
- [UI Architecture Notes](#ui-architecture-notes)
- [Defining Types for Actions](#defining-types-for-actions)
- [Passing in Params for Functions](#passing-in-params-for-functions)
- [Creating a Filter Action](#creating-a-filter-action)
- [Creating Aggregated Actions](#creating-aggregated-actions)
- [Code Example](#code-example-1)
- [The Three Pillars of an Effect](#the-three-pillars-of-an-effect)
- [Further Reading](#further-reading)
- [CodeBox Interface](#codebox-interface)
- [The Power of Ngrx/Entity Deep Dive](#the-power-of-ngrxentity-deep-dive)
- [Creating Subject - In Component](#creating-subject-in-component)
- [Setup ElementRefs in Component HTML](#setup-elementrefs-in-component-html)
- [Merge Subjects into Singular Subscribe](#merge-subjects-into-singular-subscribe)
- [Accessing store](#accessing-store)
- [Button Clicked](#button-clicked)
- [modal should appear when button is clicked](#modal-should-appear-when-button-is-clicked)
- [Interface Architecture - The Dillema](#interface-architecture-the-dillema)
- [Service for Pulling in Pre-Populated Grid Form](#service-for-pulling-in-pre-populated-grid-form)
- [Service Spec for Pulling in Pre-Populated Grid Form](#service-spec-for-pulling-in-pre-populated-grid-form)
- [Reducer for populating state with appropriate Grid](#reducer-for-populating-state-with-appropriate-grid)
- [Reducer Spec for populating state with appropriate Grid](#reducer-spec-for-populating-state-with-appropriate-grid)
- [Effect for populating state with appropriate Grid](#effect-for-populating-state-with-appropriate-grid)
- [Effect Spec for populating state with appropriate Grid](#effect-spec-for-populating-state-with-appropriate-grid)
- [Spy User Example](#spy-user-example)
- [Distinguish Between Statements + Branches](#distinguish-between-statements-branches)
- [Understanding Letters on Side of Code Coverage](#understanding-letters-on-side-of-code-coverage)
- [Understanding Colors](#understanding-colors)
- [Creating a unit test](#creating-a-unit-test)
- [Write an E2E test and Watch it Fail](#write-an-e2e-test-and-watch-it-fail)
- [Write Unit tests and watch them fail](#write-unit-tests-and-watch-them-fail)
- [Code Until All Unit Tests are Satisfied](#code-until-all-unit-tests-are-satisfied)
- [Optional - Tuck in any untucked corners](#optional-tuck-in-any-untucked-corners)
- [Check to see if E2E Test Passes](#check-to-see-if-e2e-test-passes)
- [Repeat the Process](#repeat-the-process)
- [Step \#1](#step-1)
- [Step \#2](#step-2)
- [Step \#3](#step-3)
- [Initializing the ApolloTestingBackend](#initializing-the-apollotestingbackend)
- [Initializing the Apollo Link](#initializing-the-apollo-link)
- [Initializing the Operation](#initializing-the-operation)
- [Running the Execute Function](#running-the-execute-function)
- [What is a Fork and Pull Workflow](#what-is-a-fork-and-pull-workflow)
- [Benefits of a Fork and Pull Workflow](#benefits-of-a-fork-and-pull-workflow)
- [Setting up a Fork and Pull Workflow with Github](#setting-up-a-fork-and-pull-workflow-with-github)
- [Creates a Table of Contents](#creates-a-table-of-contents)
- [Communicate to Maintainers](#communicate-to-maintainers)
- [Helps Secure Values](#helps-secure-values)

<!-- /code_chunk_output -->


#include "./introduction/introduction.md"
#include "./dev-tools/dependency-graph/dependency-graph.md";
#include "./dev-tools/angular-cli/angular-cli.md";
#include "./dev-tools/nrwl/nrwl.md";
#include "./dev-tools/compodoc/compodoc.md";
#include "./dev-tools/angular-cli-post-nx/angular-cli-post-nx.md";
#include "./dev-tools/github/code-owners/code-owners.md";
#include "./dev-tools/github/github-wiki/github-wiki.md";
#include "./dev-tools/github/github-board/github-board.md";
#include "./dev-tools/linting/format-all-the-things/format-all-the-things.md";
#include "./dev-tools/linting/lint-all-the-things/lint-all-the-things.md";
#include "./dev-tools/linting/linting-html/linting-html.md";
#include "./dev-tools/linting/linting-sass/linting-sass.md";
#include "./dev-tools/linting/accessibility/accessibility.md";
#include "./dev-tools/lighthouse/lighthouse.md";
#include "./dev-tools/schematics/schematics.md";
#include "./dev-tools/schematics/schematics-deep-dive/schematics-deep-dive.md";
#include "./dev-tools/schematics/px-schematics/px-schematics.md";
#include "./dev-tools/schematics/nrwl-schematics/nrwl-schematics.md";
#include "./dev-tools/storybook/storybook.md";
#include "./typescript/data-access-interface/data-access-interface.md";
#include "./typescript/data-models/data-models.md";
#include "./typescript/interfaces-and-partials/interfaces-and-partials.md";
#include "./typescript/tsconfig/tsconfig.md";
#include "./typescript/component-inheritance/component-inheritance.md";6
#include "./typescript/barrel-file/barrel-file.md";
#include "./typescript/getting-and-setting/getting-and-setting.md";
#include "./typescript/immutable/immutable.md";
#include "./typescript/declaration-files/declaration-files.md";
#include "./typescript/declaration-files/custom-declaration-files/custom-declaration-files.md";
#include "./design-language-system/design-language-system.md";
#include "./design-language-system/material-design/material-design.md";
#include "./design-language-system/material-overrides/material-overrides.md";
#include "./design-language-system/typography/typography.md";
#include "./design-language-system/ui-skeleton/ui-skeleton.md";
#include "./design-language-system/font-awesome/font-awesome.md";
#include "./design-language-system/sass-error-reporting/sass-error-reporting.md";
#include "./rxjs/introduction/introduction.md";
#include "./rxjs/debugging-rxjs/debugging-rxjs.md";
#include "./rxjs/cold-vs-hot/cold-vs-hot .md";
#include "./rxjs/creation/creation.md";
#include "./rxjs/combination/combination.md";
#include "./rxjs/filtering/filtering.md";
#include "./rxjs/transformation/transformation.md";
#include "./rxjs/utility/utility.md";
#include "./rxjs/multicasting/multicasting.md";
#include "./rxjs/rxjs-pitfalls/rxjs-pitfalls.md";
#include "./rxjs/rxjs-and-facades/rxjs-and-facades.md";
#include "./architecture/configs/creating-a-config/creating-a-config.md";
#include "./architecture/configs/feature-flags/feature-flags.md";
#include "./architecture/environment/environment .md";
#include "./architecture/file-structure/lib-file-structure/lib-file-structure.md";
#include "./architecture/file-structure/setting-up-lib-folder-structure/setting-up-lib-folder-structure.md";
#include "./architecture/file-structure/data-access/data-access.md";
#include "./architecture/file-structure/nx-lib-conventions/nx-lib-conventions.md";
#include "./architecture/file-structure/data-services/data-services.md";
#include "./architecture/dialogs/dialogs.md";
#include "./architecture/lazy-loading/lazy-loading.md";
#include "./architecture/transloco/transloco.md";
#include "./architecture/lazy-loading/lazy-loading-images/lazy-loading-images.md";
#include "./architecture/lazy-loading/network-aware-preloading/network-aware-preloading.md";
#include "./architecture/modules/shared-modules/shared-modules.md";
#include "./architecture/forms/form-validation/form-validation.md";
#include "./architecture/angular-elements/angular-elements.md";
#include "./architecture/angular-react/angular-react .md";
#include "./architecture/custom-web-components/custom-web-components.md";
#include "./architecture/micro-frontends/micro-frontends.md";
#include "./architecture/micro-frontends/micro-architecture/micro-architecture.md";
#include "./architecture/angular-elements/static-site-generation/static-site-generation.md";
#include "./architecture/smart-vs-dumb-components/smart-vs-dumb-components.md";
#include "./architecture/error-handling/error-handling.md";
#include "./architecture/interceptors/interceptors.md";
#include "./architecture/routing/guards/guards.md";
#include "./architecture/routing/route-guard-pre-loading/route-guard-pre-loading.md";
#include "./architecture/routing/containers-and-routing/containers-and-routing.md";
#include "./core/terms/terms.md";
#include "./core/life-cycle/life-cycle.md";
#include "./core/dependency-injection/dependency-injection.md";
#include "./core/decorators/input/input .md";
#include "./core/decorators/output/output .md";
#include "./core/internationalization/internationalization.md";
#include "./core/content-projection/content-projection.md";
#include "./core/templates/displaying-data/displaying-data.md";
#include "./core/templates/template-syntax/template-syntax.md";
#include "./core/modules/modules.md";
#include "./core/services/services.md";
#include "./core/routing/routing.md";
#include "./core/forms/forms.md";
#include "./core/forms/reactive-forms/reactive-forms.md";
#include "./core/directives/directives.md";
#include "./core/pipes/pipes.md";
#include "./core/observables/observables.md";
#include "./core/observables/angular-observables/angular-observables.md";
#include "./core/animations/animations.md";
#include "./core/animations/transitions-and-triggers/transitions-and-triggers.md";
#include "./performance/track-by/track-by.md";
#include "./performance/bundle-size/bundle-size.md";
#include "./performance/images/images.md";
#include "./performance/modern-script-loading/modern-script-loading.md";
#include "./performance/ahead-of-time/ahead-of-time.md";
#include "./performance/implementing-service-worker/implementing-service-worker.md";
#include "./performance/understanding-rendering/understanding-rendering.md";
#include "./performance/angular-universal/angular-universal.md";
#include "./performance/angular-elements/angular-elements.md";
#include "./performance/change-detection/change-detection.md";
#include "./performance/caching/using-apollo-with-ngrx/using-apollo-with-ngrx.md";
#include "./performance/caching/sockets/sockets.md";
#include "./performance/caching/apollo-caching-with-sockets/apollo-caching-with-sockets.md";
#include "./pwa/responsive/responsive.md";
#include "./pwa/pwa-toolset-physical-devices/pwa-toolset-physical-devices.md";
#include "./pwa/pwa-toolset-sauce-labs/pwa-toolset-sauce-labs.md";
#include "./pwa/mobile-first/mobile-first .md";
#include "./pwa/responsive/flex-layout/flex-layout .md";
#include "./pwa/styling-a-component/styling-a-component .md";
#include "./pwa/scully/scully.md";
#include "./state/when-to-use-ngrx/when-to-use-ngrx.md";
#include "./state/primer/actions/actions.md";
#include "./state/primer/reducers/reducers.md";
#include "./state/history-of-state-management/history-of-state-management .md";
#include "./state/introduction-to-ngrx-store/introduction-to-ngrx-store.md";
#include "./state/ngrx-cli/ngrx-cli.md";
#include "./state/ngrx-store/ngrx-store.md";
#include "./state/ngrx-router-store/ngrx-router-store.md";
#include "./state/store-selectors/store-selectors.md";
#include "./state/aggregation-pattern/aggregation-pattern.md";
#include "./state/re-using-reducer-logic/re-using-reducer-logic.md";
#include "./state/ngrx-effects/ngrx-effects.md";
#include "./state/ngrx-entity/heavily-use/heavily-use.md";
#include "./state/ngrx-entity/ngrx-entity.md";
#include "./state/ngrx-properly-unsubscribing/ngrx-properly-unsubscribing.md";
#include "./state/re-usable-state-anti-pattern/re-usable-state-anti-pattern.md";
#include "./state/facade-pattern/facade-pattern.md";
#include "./state/data-access/data-access.md";
#include "./state/data-access/data-access-testing-module/data-access-testing-module.md";
#include "./state/correlation-id-service/correlation-id-service.md";
#include "./state/integrating-component-with-ngrx-store/integrating-component-with-ngrx-store.md";
#include "./graphics/charts/charts.md";
#include "./unit-testing/benefits-of-unit-testing/benefits-of-unit-testing.md";
#include "./unit-testing/unit-testing-performance/unit-testing-performance.md";
#include "./unit-testing/fixture-vs-debug/fixture-vs-debug.md";
#include "./unit-testing/sass-unit-testing/sass-unit-testing.md";
#include "./unit-testing/spectator/spectator.md";
#include "./unit-testing/unit-testing.md";
#include "./unit-testing/understanding-different-types-of-unit-tests/understanding-different-types-of-unit-tests.md";
#include "./unit-testing/jest/jest .md";
#include "./unit-testing/cypress/cypress.md";
#include "./unit-testing/cypress/cypress-local/cypress-local.md";
#include "./unit-testing/state/state.md";
#include "./unit-testing/unit-testing-architecture/unit-testing-architecture.md";
#include "./unit-testing/interfaces-and-unit-testing/interfaces-and-unit-testing.md";
#include "./unit-testing/mocking-data/mocking-data.md";
#include "./unit-testing/spies/spies.md";
#include "./unit-testing/debugging/debugging.md";
#include "./unit-testing/coverage-reporting/coverage-reporting.md";
#include "./unit-testing/unit-testing-dom/unit-testing-dom.md";
#include "./unit-testing/mocking-providers/mocking-providers.md";
#include "./unit-testing/unit-testing-modules/unit-testing-modules.md";
#include "./unit-testing/marble-unit-testing/marble-unit-testing.md";
#include "./unit-testing/unit-testing-subscriptions/unit-testing-subscriptions.md";
#include "./unit-testing/first-principles-thinking/first-principles-thinking.md";
#include "./unit-testing/e2e-tests-in-tdd-setting/e2e-tests-in-tdd-setting.md";
#include "./unit-testing/automation-engineering/automation-engineering.md";
#include "./unit-testing/writing-e2e-tests/writing-e2e-tests.md";
#include "./unit-testing/apollo/unit-testing-apollo/unit-testing-apollo.md";
#include "./unit-testing/apollo/apollo-client-middleware/apollo-client-middleware.md";
#include "./unit-testing/apollo/interfaces-and-unions/interfaces-and-unions.md";
#include "./unit-testing/apollo/data-graphql/data-graphql.md";
#include "./miscellaneous/versioning/versioning.md";
#include "./miscellaneous/ng-container-hack/ng-container-hack.md";
#include "./miscellaneous/npm/npm-vs-yarn/npm-vs-yarn.md";
#include "./miscellaneous/administrative/weekly-dev-meeting/weekly-dev-meeting.md";
#include "./miscellaneous/creating-a-component/creating-a-component .md";
#include "./miscellaneous/creating-second-component/creating-second-component .md";
#include "./miscellaneous/creating-a-component/creating-a-dumb-component .md";
#include "./miscellaneous/ticket-creation/technical-design-notes.md";
#include "./miscellaneous/ticket-creation/acceptance-criteria.md";
#include "./miscellaneous/ticket-creation/component-design.md";
#include "./miscellaneous/code-administration/code-reviews/code-reviews.md";
#include "./miscellaneous/pixel-grid/pixel-grid-container/pixel-grid-container.md";
#include "./miscellaneous/pixel-grid/pixel-grid-container-layout/pixel-grid-container-layout .md";
#include "./miscellaneous/adding-a-route-to-our-container/adding-a-route-to-our-container.md";
#include "./miscellaneous/color-picker/color-picker.md";
#include "./miscellaneous/constants/constants.md";
#include "./miscellaneous/constants/enums-as-constants.md";
#include "./miscellaneous/authorization/authorization.md";
#include "./code-examples/building-our-application/building-our-application.md";
