#!/bin/sh

# This script assist user to create a Predix-Mobile service instance with UAA service.
# Prior to run the script, please make sure you have done the following:
#  	1. cf is installed
#  	2. uaac is installed
#  	3. $cf login -a https://api.system.aws-usw02-pr.ice.predix.io/

set -e

main() {
    # disabling cf trace mode.
    export CF_TRACE=false
    # for testing
    # testParams

    welcome
    requirements
    pushCFAppForBind
    checkUAA

    #### remove next
    # bindUAA
    #### remove next
    # getUAAEndpoint


    createPMService
    bindPMService
    parsePMServiceEP
    ### sadKitty
    output
}

mobile_service_progress=0

##############################################################################
# Requirements check
requirements()
{
  {
    echo "Checking prerequisites ..."
    verifyCommand 'cf -v'
    verifyCommand 'uaac -v'
    echo ""
    read -p 'Are you logged into CF? [Yes/n]: ' is_cf_in

    is_cf_in=$(echo "$is_cf_in" | tr '[:upper:]' '[:lower:]')
    if [ "$is_cf_in" != "yes" ] ; then

        echoc y "Log in to CF: 'cf login [-a API_URL] [-u USERNAME] [-p PASSWORD] [-o ORG] [-s SPACE]'"
        sadKitty
    fi

  } ||
  {
    echo "ERROR!"
  }
}

############################### CF APP for Binding ############################
# Push CF app

pushCFAppForBind()
{
  echo "\nPushing an app to your cloudfoundry space..."
  echoc p "#####################################################################"
  # read -p 'Enter a name for CF app:  ' cf_app
  {
    # cf push -f ./cf-default-app/manifest.yml
    cf_app=pm-dummy-hello-world-app
    cf push -f ./pm-cf-app/manifest.yml --random-route
  } ||
  {
    sadKitty
    # echo "Looks like same named app already exisit. Change -name in pm-cf-app/manifest.yml\n"
  }
}

############################### UAA stuff #####################################
# Read existing UAA values

readUAA()
{
  read -p 'URI of UAA: ' uaa_uri
  # readSilent 'Enter UAA admin secret:' uaa_secret
  # echo "remove me uaa url: $uaa_uri"
  # echo "remove me secret: $uaa_secret"
}

# Create a new UAA
createUAA()
{
  echo "\n"
  echo  'Let's                    \r\c'
  sleep .4
  echo  'Let's create             \r\c'
  sleep .3
  echo  'Let's create one         \r\c'
  sleep .2
  echo  'Let's create one for you.\r\c'

  echo "Let's create one for you."
  sleep .3

  read -p 'UAA instance name: ' uaa_instance_name
  readSilent 'UAA admin secret: ' uaa_secret
  read -p 'UAA service plan name {can be checked by running `cf marketplace` in other terminal} (default: Tiered): ' uaa_plan_name

  if [[ -z "$uaa_plan_name" ]]; then
    uaa_plan_name="Tiered"
    echo  "Using default plan named $uaa_plan_name"
  fi

  uaa_config_json="{\"adminClientSecret\":\""
  uaa_config_json="$uaa_config_json$uaa_secret\"}"
  echoc p "####################################################################"
  {
    cf create-service predix-uaa $uaa_plan_name $uaa_instance_name -c $uaa_config_json
  } ||
  {
    sadKitty
  }
}

# bind to new UAA
bindUAA()
{
  # uaa_instance_name=km-uaa
  # cf_app=pm-dummy-hello-world-app
  echo "\n"
  echo  "Binding $cf_app                               \r\c"
  sleep .4
  echo  "Binding $cf_app app to                        \r\c"
  sleep .3
  echo  "Binding $cf_app app to $uaa_instance_name UAA \r\c"
  sleep .2

  echo  "Binding $cf_app app to $uaa_instance_name UAA "
  {
    cf bind-service $cf_app $uaa_instance_name
  } ||
  {
    sadKitty
  }
}

# Get endpoint from UAA
getUAAEndpoint()
{
  echo "Getting UAA endpoint for you..."
  # cf env km-basic-app
  # cf_app=km-basic-app
  # cf env $cf_app
  {
# TODO: STILL need to work on better parsing logic. (This is slightly better)
  env_cf_app=$(cf env $cf_app)
  env_cf_app=$(cf env $cf_app)
  uaa_uri=`echo $env_cf_app | egrep -o '"uri": "https?://[^ ]+"' | sed s/\"uri\":\ // | sed s/\"//g`


 if [[ $uaa_uri == *"FAILED"* ]];
 then
   echoc r "Unable to find UAA endpoint for you!"
   sadKitty
   exit -1
 fi

 echoc g "\nUAA endpoint: $uaa_uri"

  } ||
  {
    sadKitty
  }
}


checkUAA()
{
  echoc p "####################################################################"
  read -p 'Do you have an existing UAA instance? [Yes/n]: ' uaaExists
  uaaExists=$(echo "$uaaExists" | tr '[:upper:]' '[:lower:]')
  if [ "$uaaExists" = "yes" ] ; then
      readUAA
  else
    createUAA
    bindUAA
    getUAAEndpoint
  fi

}

############################### PM service progress ###########################
# Progress bar

progress_bar_val="#"
progress()
{
  if [ "$mobile_service_progress" -ge 100 ]; then
    # kill $spinner_pid &>/dev/null
    echoc r "Unable to bind to Mobile service eneve after 500 seconds!"
    sadKitty
  fi

  ((mobile_service_progress++))

  progress_bar_val="$progress_bar_val#"

  # echo  "#####                     ($completed%)\r\c"
  echo  "$progress_bar_val\r\c"
  sleep 5
}

# Spinner
spinner() {
    local i sp n
    sp='/-\|'
    n=${#sp}
    printf ' '
    while sleep 0.2; do
        printf "%s\b" "${sp:i++%n:1}"
    done
}

############################### PM service ###############################
# Create PM service instance
createPMService()
{
  echoc p "####################################################################"
  echo  'Let's create                          \r\c'
  sleep .4
  echo  'Let's create a Mobile service           \r\c'
  sleep .3
  echo  'Let's create a Mobile service instance. \r\c'

  echo  'Let's create a Mobile service instance.'
  sleep .3

  read -p 'Predix-Mobile service instance name: ' pm_instance_name
  read -p 'Predix-Mobile service plan name {you can check it via running `cf marketplace` in other terminal} (default: Tiered): ' pm_plan_name

  if [[ -z "$pm_plan_name" ]]; then
    pm_plan_name="Tiered"
    echo  "Using default plan named $pm_plan_name"
  fi


  config_json="{\"trustedIssuerIds\":[\""
  config_json="$config_json$uaa_uri\"]}"
  {
    cf create-service predix-mobile  $pm_plan_name $pm_instance_name -c $config_json
  } ||
  {
    sadKitty
  }


}

# Get PM service endpoint
parsePMServiceEP()
{
  # cf_app=pm-dummy-hello-world-app
  # pm_instance_name=pm-service
  echo "Getting Mobile service endpoint for you ..."
  env_cf_app=$(cf env $cf_app)
  pmservice_prefix_key="predix-mobile"

  if [[ $env_cf_app != *"$pmservice_prefix_key"* ]];
  then
    echoc r "Error in binding to Mobile service!"
    sadKitty
  fi

  front=${env_cf_app%${pmservice_prefix_key}*}
  rear=${env_cf_app#*${pmservice_prefix_key}}
  # echo "front: $front"
  # echo "rear: $rear"

  env_cf_app=$rear
  pmservice_prefix_key="api_gateway_short_route\": \""
  front=${env_cf_app%${pmservice_prefix_key}*}
  rear=${env_cf_app#*${pmservice_prefix_key}}
  # echo "1rear: $rear"
  # echo "1front: $front"

  env_cf_app=$rear
  pmservice_prefix_key="/\",
     \"dbname\""
  front=${env_cf_app%${pmservice_prefix_key}*}
  rear=${env_cf_app#*${pmservice_prefix_key}}
  # echo "2front: $front"
  # echo "2rear: $rear"

  pm_service_short_uri=$front


  if [[ $pm_service_short_uri == *"FAILED"* ]];
  then
    echoc r "Unable to find Mobile service short route you!"
    sadKitty
    exit -1
  fi

  echoc g "Mobile service short route is: $pm_service_short_uri"
  echoc g "\nFor future references details about various endpoints and credentials can be found here :--> ~/pm-config.txt"
}


# Bind to PM service
bindPMService()
{
  # cf_app=pm-dummy-hello-world-app
  # pm_instance_name=pm-service
  echo "\n"
  echo  "Binding $cf_app                          \r\c"
  sleep .4
  echo  "Binding $cf_app app to                   \r\c"
  sleep .3
  echo  "Binding $cf_app app to $pm_instance_name \r\c"
  sleep .2

  echo  "Binding $cf_app app to $pm_instance_name "
  {
    bind_response=$(cf bind-service $cf_app $pm_instance_name)


  # Checking for faults
  if [[ ($bind_response == *"\"is_fault\":true"*) || ($bind_response == *"not found"*) ]];
  then
    echoc r "\nError binding Mobile Service:"
    echo "$bind_response"
    sadKitty
  fi

  echoc y "Please wait, mobile service provisioning still in progress (avg time 3-5 minutes) ..."

  repeat=1
  while [  ${repeat} -eq 1 ]
  do
    bind_response=$(cf bind-service $cf_app $pm_instance_name)
    if [[ $bind_response == *"Service provisioning still in progress"* ]];
    then
      # spinner &
      # spinner_pid=$!
      progress
    else
      repeat=0
    fi

  done


  # Checking for faults again - Do I need to extract a function
  if [[ ($bind_response == *"\"is_fault\":true"*) || ($bind_response == *"not found"*) ]];
  then
    echoc r "\nError in binding Mobile Service:"
    echo "$bind_response"
    sadKitty
  fi

  } ||
  {
    sadKitty
  }
}

############################### ASCII ART ###############################
# Predix Mobile
welcome()
{
	cat <<"EOT"
  _____              _ _        __  __       _     _ _
|  __ \            | (_)      |  \/  |     | |   (_) |
| |__) | __ ___  __| |___  __ | \  / | ___ | |__  _| | ___
|  ___/ '__/ _ \/ _` | \ \/ / | |\/| |/ _ \| '_ \| | |/ _ \
| |   | | |  __/ (_| | |>  <  | |  | | (_) | |_) | | |  __/
|_|   |_|  \___|\__,_|_/_/\_\ |_|  |_|\___/|_.__/|_|_|\___|

EOT
}

# sad kitty
sadKitty()
{
    cat <<"EOT"

    /\ ___ /\
   (  o   o  )
    \  >#<  /
    /       \
   /         \       ^
  |           |     //
   \         /    //
    ///  ///   --

EOT
echo ""
exit 1
}

############################### Helpers ###############################
# Color echo
echoc() {
  local code="\033["
  case "$1" in
    black  | bk) color="${code}0;30m";;
    red    |  r) color="${code}1;31m";;
    green  |  g) color="${code}1;32m";;
    yellow |  y) color="${code}1;33m";;
    blue   |  b) color="${code}1;34m";;
    purple |  p) color="${code}1;35m";;
    cyan   |  c) color="${code}1;36m";;
    gray   | gr) color="${code}0;37m";;
    *) local text="$1"
  esac
  [ -z "$text" ] && local text="$color$2${code}0m"
  echo "$text"
}

# Read a value without echoing
readSilent()
{
  stty_original=`stty -g`
  stty -echo
  read -p "$1  " $2
  stty $stty_original
  echo "\n"
}

# Verifies a given command exisitance
verifyCommand()
{
  x=$($1)
  # echo "x== $x"
  if [[ ${#x} -gt 5 ]];
  then
    echo "OK - $1"
  else
    echoc r "$1 not found!"
    echoc g "Please install: "
    echoc g "\t CF - https://github.com/cloudfoundry/cli"
    echoc g "\t UAAC -https://github.com/cloudfoundry/cf-uaac"
    sadKitty
  fi

}

testParams()
{
  #   Test values
      uaa_instance_name=UAA-pm-km-script
      cf_app=pm-dummy-hello-world-app
      pm_instance_name=MobileService-pm-km-script
}

output()
{
  cat <<EOF >~/pm-config.txt
uaa_instance_name     : "$uaa_instance_name"
uaa_secret            : "$uaa_secret"
uaa_uri               : "$uaa_uri"

cf_app                : "$cf_app"

pm_instance_name      : "$pm_instance_name"
pm_service_short_uri  : "$pm_service_short_uri"

EOF
}
# echo "$(tput setaf 1)Red text $(tput setab 7)and white background$(tput sgr 0) and normal"

main "$@"
