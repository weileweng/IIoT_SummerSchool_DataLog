#/bin/bash
set -e

while getopts "e:p:" opt; do
    case $opt in
	e)
	    user_email=$OPTARG
		;;
  	p)
      	user_password=$OPTARG
      	;;
	\?)
	    echo "Invalid option: -$OPTARG" >&2
	    exit 1
	    ;;
	:)
	    echo "Option -$OPTARG requires an argument." >&2
	    exit 1
	    ;;
    esac
done

if [[ -z "$user_email" ]]; then
	user_email="px-auth-service"
	echo "[INFO] Using default account name: $user_email"
fi

if [[ -z "$user_password" ]]; then
    echo "Specify the password of the new authorization-service account:"
    stty_original=`stty -g`
	stty -echo
	read passwd
	stty $stty_original     # restoring terminal
	user_password=$passwd
fi

echo "Adding authorization-service account to UAA: $user_email"

# Create user in currently targeted UAA server.
{
	# Create user in currently targeted UAA server.
	uaac user add $user_email --emails $user_email --password $user_password
} ||
{
	echo "[WARN] Unable to create user;  the user may already exist."
	echo "[WARN] Continuing to attempt adding of required scope to user."
}

# Add `pm.admin` group to user.
echo "Adding pm.authorization scope to user."
uaac member add "pm.authorization" "$user_email"

echo "OK"
