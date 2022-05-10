image:
  repository: ${QUAY_REPO}

imagePullSecrets:
  - name: ${PULL_SECRET_NAME}

fullnameOverride: ${HELM_RELEASE}
nameOverride: ${HELM_RELEASE}

ingress:
  annotations:
    cert-manager.io/issuer: zerossl-prod
  hosts:
    - host: ${DOMAIN}
      paths:
        - /
  tls:
    - secretName: ${HELM_RELEASE}-tls
      hosts:
        - ${DOMAIN}

service:
  port: ${SVC_PORT}
